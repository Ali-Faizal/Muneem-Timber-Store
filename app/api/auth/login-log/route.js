import dbConnect from "@/lib/mongodb";
import { User, UserLoginLog, ActivityLog, DashboardNotification } from "@/lib/models";
import { sendEmailNotification } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const { email, deviceInfo } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Locate the customer name & mobile number in database
    const user = await User.findOne({ email });
    const name = user ? user.name : email.split("@")[0];
    const phone = user ? user.phone : "N/A";

    const newLog = new UserLoginLog({
      name,
      email,
      phone,
      loginTime: new Date(),
      deviceInfo: deviceInfo || "Unknown Device",
      lastActive: new Date()
    });
    await newLog.save();

    // Log Activity log
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" });
    const activity = new ActivityLog({
      action: "Customer Login",
      user: email,
      date,
      time,
      affectedRecord: `Customer: ${name}`
    });
    await activity.save();

    // Create Dashboard Notification
    const notification = new DashboardNotification({
      type: "login",
      title: "🔔 Customer Logged In",
      message: `Customer Name: ${name}, Email: ${email}, Phone: ${phone}, Login Time: ${date} ${time}`
    });
    await notification.save();

    // Fetch client IP address for the email alert
    const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";

    // Send Customer Login Email Alert
    const emailSubject = "Customer Login Alert - Muneem Timber Store";
    const emailText = `Customer Login Alert:\n\nCustomer Name: ${name}\nEmail Address: ${email}\nMobile Number: ${phone}\nLogin Date & Time: ${date} ${time}\nDevice Information: ${deviceInfo || "Unknown Device"}\nIP Address: ${clientIp}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #1251A3; border-radius: 12px; max-width: 500px;">
        <h2 style="color: #1251A3; margin-top: 0;">Muneem Timber Store</h2>
        <h3 style="color: #333;">🔔 Customer Logged In</h3>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 5px 0; font-weight: bold; width: 140px;">Customer Name:</td><td>${name}</td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">Email Address:</td><td><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">Mobile Number:</td><td>${phone}</td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">Login Date & Time:</td><td>${date} ${time}</td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">Device Info:</td><td>${deviceInfo || "Unknown Device"}</td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">IP Address:</td><td>${clientIp}</td></tr>
        </table>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
        <p style="font-size: 12px; color: #777; margin-bottom: 0;">Muneem Timber Store, serving Hardoi since 1995.</p>
      </div>
    `;

    sendEmailNotification({
      subject: emailSubject,
      text: emailText,
      html: emailHtml
    }).catch(err => console.error("Customer login email delivery failed:", err));

    return NextResponse.json({ success: true, log: newLog });
  } catch (error) {
    console.error("Login Log POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Retrieve recent customer logins for owner dashboard
export async function GET(request) {
  try {
    await dbConnect();
    const logs = await UserLoginLog.find({})
      .sort({ loginTime: -1 })
      .limit(10);
    return NextResponse.json(logs);
  } catch (error) {
    console.error("Login Log GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
