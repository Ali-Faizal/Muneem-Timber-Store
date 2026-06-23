import dbConnect from "@/lib/mongodb";
import { Owner } from "@/lib/models";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required!" },
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

    // Check if recovery email is in approved list
    const approvedEmails = ["faizmsri@gmail.com", "aaqilmansoorias@gmail.com"];
    const isApproved = approvedEmails.includes(owner.recoveryEmail?.toLowerCase());
    if (!isApproved) {
      return NextResponse.json(
        { error: "Unauthorized Owner Account" },
        { status: 403 }
      );
    }

    // Generate new OTP
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Owner Resend OTP error:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
