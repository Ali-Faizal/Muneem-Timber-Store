import dbConnect from "@/lib/mongodb";
import { Owner, LoginAttempt, ActivityLog } from "@/lib/models";
import { hashPassword, verifyPassword } from "@/lib/auth-node";
import { signSession } from "@/lib/auth-edge";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required!" },
        { status: 400 }
      );
    }

    // 1. Seed Owner credentials if none exist in the collection
    const ownerCount = await Owner.countDocuments({});
    if (ownerCount === 0) {
      console.log("Seeding default owner credentials...");
      const hashedPassword = hashPassword("MTS@1995Secure");
      const defaultOwner = new Owner({
        username: "owner",
        password: hashedPassword,
        recoveryDetails: "Legacy account set in 1995",
        recoveryEmail: "faizmsri@gmail.com",
        isEmailVerified: true
      });
      await defaultOwner.save();
    }

    // 2. Fetch client IP address for brute-force tracking
    const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";

    // 3. Brute Force Protection check
    let attemptRecord = await LoginAttempt.findOne({ username });
    if (!attemptRecord) {
      attemptRecord = new LoginAttempt({ username, ip: clientIp, attempts: 0 });
      await attemptRecord.save();
    }

    if (attemptRecord.lockedUntil && attemptRecord.lockedUntil > new Date()) {
      const remainingMs = attemptRecord.lockedUntil.getTime() - Date.now();
      const remainingMins = Math.ceil(remainingMs / 60000);
      
      // Log attempt while locked
      const date = new Date().toISOString().split("T")[0];
      const time = new Date().toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" });
      const blockedLog = new ActivityLog({
        action: "Blocked Owner Login Attempt (Rate-limited)",
        user: username,
        date,
        time,
        affectedRecord: `IP: ${clientIp} blocked`
      });
      await blockedLog.save();

      return NextResponse.json(
        { error: `Too many failed attempts. Login is locked. Please try again after ${remainingMins} minutes.`, locked: true, remainingMs },
        { status: 423 } // Locked status
      );
    }

    // 4. Retrieve Owner record from database
    const owner = await Owner.findOne({ username });

    // Helper for formatting date & time
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" });

    // 5. Credential Verification
    if (!owner || !verifyPassword(password, owner.password)) {
      // Increment failures
      attemptRecord.attempts += 1;
      let isLocked = false;
      let lockedUntilDate = null;

      if (attemptRecord.attempts >= 3) {
        isLocked = true;
        // Lockout for 5 minutes
        lockedUntilDate = new Date(Date.now() + 5 * 60000);
        attemptRecord.lockedUntil = lockedUntilDate;
      }

      await attemptRecord.save();

      // Log failure in Activity logs
      const failedLog = new ActivityLog({
        action: isLocked ? "Owner Locked Out (3 Failed Logins)" : "Failed Owner Login Attempt",
        user: username,
        date,
        time,
        affectedRecord: `IP: ${clientIp}`
      });
      await failedLog.save();

      if (isLocked) {
        return NextResponse.json(
          { error: "Too many failed attempts. Account locked for 5 minutes.", locked: true, remainingMs: 5 * 60000 },
          { status: 423 }
        );
      } else {
        return NextResponse.json(
          { error: `Invalid credentials. ${3 - attemptRecord.attempts} attempts remaining.` },
          { status: 401 }
        );
      }
    }

    // 6. Login Success: Reset attempts counter
    attemptRecord.attempts = 0;
    attemptRecord.lockedUntil = null;
    await attemptRecord.save();

    // 7. Write Owner Activity Log
    const successLog = new ActivityLog({
      action: "Owner Login",
      user: username,
      date,
      time,
      affectedRecord: `IP: ${clientIp}`
    });
    await successLog.save();

    // Check if recoveryEmail is in approved list
    const approvedEmails = ["faizmsri@gmail.com", "aaqilmansoorias@gmail.com"];
    const isApproved = approvedEmails.includes(owner.recoveryEmail?.toLowerCase());
    if (!isApproved) {
      return NextResponse.json(
        { error: "Unauthorized Owner Account" },
        { status: 403 }
      );
    }

    // Check email verification status
    if (!owner.isEmailVerified) {
      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      owner.otpCode = otp;
      owner.otpExpires = new Date(Date.now() + 5 * 60000); // 5 minutes
      await owner.save();

      // Send OTP Email
      const { sendEmailNotification } = require("@/lib/email");
      await sendEmailNotification({
        subject: "Owner Email Verification Code - Muneem Timber Store",
        text: `Your owner verification code is: ${otp}. It will expire in 5 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #1251A3; border-radius: 12px; max-width: 500px;">
            <h2 style="color: #1251A3; margin-top: 0;">Muneem Timber Store</h2>
            <h3>Owner Email Verification Code</h3>
            <p>Enter the following OTP code to verify and access your account:</p>
            <h1 style="color: #1251A3; font-size: 32px; letter-spacing: 4px; text-align: center; margin: 20px 0;">${otp}</h1>
            <p style="font-size: 12px; color: #777;">This code will expire in 5 minutes.</p>
          </div>
        `
      }).catch(err => console.error("OTP send failed:", err));

      return NextResponse.json({
        success: true,
        requiresVerification: true,
        email: owner.recoveryEmail
      });
    }

    // 8. Generate Session (valid for 24 hours)
    const expiryTimestamp = Date.now() + 24 * 60 * 60 * 1000;
    const sessionToken = await signSession(username, owner.recoveryEmail, "true", expiryTimestamp);

    const response = NextResponse.json({
      success: true,
      redirect: "/mts-owner-panel-1995/dashboard",
      owner: {
        username: owner.username,
        recoveryEmail: owner.recoveryEmail
      }
    });

    // 9. Write session cookie (HttpOnly, Secure, SameSite)
    response.cookies.set("owner_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(expiryTimestamp),
      sameSite: "strict"
    });

    return response;
  } catch (error) {
    console.error("Owner Login Route API error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
