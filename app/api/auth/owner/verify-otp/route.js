import dbConnect from "@/lib/mongodb";
import { Owner, ActivityLog } from "@/lib/models";
import { signSession } from "@/lib/auth-edge";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const { username, otp } = await request.json();

    if (!username || !otp) {
      return NextResponse.json(
        { error: "Username and OTP are required!" },
        { status: 400 }
      );
    }

    const owner = await Owner.findOne({ username });
    if (!owner) {
      return NextResponse.json(
        { error: "Owner account not found!" },
        { status: 404 }
      );
    }

    // Check OTP
    if (!owner.otpCode || owner.otpCode !== otp) {
      return NextResponse.json(
        { error: "Invalid verification code!" },
        { status: 400 }
      );
    }

    if (owner.otpExpires && owner.otpExpires < new Date()) {
      return NextResponse.json(
        { error: "Verification code has expired!" },
        { status: 400 }
      );
    }

    // OTP is valid! Mark verified.
    owner.isEmailVerified = true;
    owner.otpCode = "";
    owner.otpExpires = null;
    await owner.save();

    // Log Activity log
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" });
    const log = new ActivityLog({
      action: "Settings Changes",
      user: username,
      date,
      time,
      affectedRecord: `Owner recovery email verified: ${owner.recoveryEmail}`
    });
    await log.save();

    // Generate Session (valid for 24 hours)
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

    // Write session cookie
    response.cookies.set("owner_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(expiryTimestamp),
      sameSite: "strict"
    });

    return response;
  } catch (error) {
    console.error("Owner OTP Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
