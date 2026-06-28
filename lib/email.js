import nodemailer from "nodemailer";

// Configured using environment variables, falling back to a dummy Gmail transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER || "muneemtimberstore@gmail.com",
    pass: process.env.SMTP_PASS || "mts@1995"
  }
});

export async function sendEmailNotification({ subject, text, html, to }) {
  const recipients = to ? (Array.isArray(to) ? to : [to]) : ["faizmsri@gmail.com", "aaqilmansoorias@gmail.com"];
  
  try {
    const info = await transporter.sendMail({
      from: `"Muneem Timber Store" <${process.env.SMTP_USER || "muneemtimberstore@gmail.com"}>`,
      to: recipients.join(", "),
      subject,
      text,
      html
    });
    console.log("Email notification sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Nodemailer error sending email:", error);
    // Return null instead of throwing to prevent crashing APIs in local environments without SMTP config
    return null;
  }
}
