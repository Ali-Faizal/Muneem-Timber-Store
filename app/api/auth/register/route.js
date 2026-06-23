import dbConnect from "@/lib/mongodb";
import { User, ActivityLog, DashboardNotification } from "@/lib/models";
import { sendEmailNotification } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const { email, name, phone, password } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Name and email are required fields!" },
        { status: 400 }
      );
    }

    // Check if user exists in local MongoDB
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered in local database!" },
        { status: 400 }
      );
    }

    const newUser = new User({
      name,
      email,
      phone: phone || "N/A",
      password: password || "firebase_authenticated",
      role: email.toLowerCase().includes("admin") ? "admin" : "customer"
    });

    await newUser.save();

    // 1. Log Activity Log
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" });
    const log = new ActivityLog({
      action: "Customer Registration",
      user: email,
      date,
      time,
      affectedRecord: `Name: ${name}, Phone: ${phone || "N/A"}`
    });
    await log.save();

    // 2. Create Dashboard Notification
    const notification = new DashboardNotification({
      type: "registration",
      title: "🔔 New Customer Registered",
      message: `Customer ${name} (${email}) has registered with phone number ${phone || "N/A"}. Registration Time: ${date} ${time}`
    });
    await notification.save();

    // 3. Dispatch Email Alert (Nodemailer)
    const emailSubject = "New Customer Registration - Muneem Timber Store";
    const emailText = `New Customer Registration Alert:\n\nName: ${name}\nEmail: ${email}\nMobile Number: ${phone || "N/A"}\nRegistration Time: ${date} ${time}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #1251A3; border-radius: 12px; max-width: 500px;">
        <h2 style="color: #1251A3; margin-top: 0;">Muneem Timber Store</h2>
        <h3 style="color: #333;">🔔 New Customer Registered</h3>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 5px 0; font-weight: bold; width: 140px;">Customer Name:</td><td>${name}</td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">Email Address:</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">Mobile Number:</td><td>${phone || "N/A"}</td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">Registration Time:</td><td>${date} ${time}</td></tr>
        </table>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
        <p style="font-size: 12px; color: #777; margin-bottom: 0;">Muneem Timber Store, serving Hardoi since 1995.</p>
      </div>
    `;

    // Asynchronously dispatch the email so it doesn't block the API response
    sendEmailNotification({
      subject: emailSubject,
      text: emailText,
      html: emailHtml
    }).catch(err => console.error("Registration email delivery failed:", err));

    return NextResponse.json({
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Registration failed: " + error.message },
      { status: 500 }
    );
  }
}
