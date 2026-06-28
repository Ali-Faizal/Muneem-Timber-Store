import dbConnect from "@/lib/mongodb";
import { Invoice } from "@/lib/models";
import { sendEmailNotification } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { invoiceNumber, email } = body;

    if (!invoiceNumber || !email) {
      return NextResponse.json(
        { error: "Invoice number and email address are mandatory!" },
        { status: 400 }
      );
    }

    const inv = await Invoice.findOne({ invoiceNumber });
    if (!inv) {
      return NextResponse.json(
        { error: "Invoice not found!" },
        { status: 404 }
      );
    }

    const itemsRows = inv.items.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.dailyRate.toFixed(2)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${inv.duration}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">
          ₹${(item.quantity * item.dailyRate * (parseInt(inv.duration) || 1)).toFixed(2)}
        </td>
      </tr>
    `).join("");

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; color: #334155;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 20px;">
          <div>
            <h1 style="color: #0A3578; margin: 0; font-size: 22px;">MUNEEM TIMBER STORE</h1>
            <p style="margin: 3px 0 0 0; color: #64748b; font-size: 11px;">Radha Nagar, Bilgram Road, Hardoi, UP | Since 1998</p>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 16px; color: #475569;">INVOICE</h2>
            <p style="margin: 2px 0 0 0; font-family: monospace; font-size: 11px;">NO: ${inv.invoiceNumber}</p>
          </div>
        </div>

        <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #f1f5f9; margin-bottom: 20px; font-size: 12px;">
          <div style="margin-bottom: 8px;">
            <strong>Customer:</strong> ${inv.customer}<br/>
            <strong>Mobile:</strong> ${inv.phone || "N/A"}<br/>
            <strong>Address:</strong> ${inv.address || "Hardoi"}
          </div>
          <div>
            <strong>Project Site:</strong> ${inv.projectLocation || "Hardoi"}<br/>
            <strong>Rental Period:</strong> ${inv.duration} (${inv.startDate} to ${inv.endDate})
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 20px;">
          <thead>
            <tr style="background: #f1f5f9; color: #0A3578;">
              <th style="padding: 8px; text-align: left; border-bottom: 2px solid #cbd5e1;">Material</th>
              <th style="padding: 8px; text-align: center; border-bottom: 2px solid #cbd5e1;">Qty</th>
              <th style="padding: 8px; text-align: right; border-bottom: 2px solid #cbd5e1;">Rate/Day</th>
              <th style="padding: 8px; text-align: center; border-bottom: 2px solid #cbd5e1;">Days</th>
              <th style="padding: 8px; text-align: right; border-bottom: 2px solid #cbd5e1;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        <div style="text-align: right; font-family: monospace; font-size: 12px; margin-bottom: 30px; line-height: 1.6;">
          Subtotal: ₹${inv.subtotal ? inv.subtotal.toFixed(2) : "0.00"}<br/>
          Discount: -₹${inv.discountAmount ? inv.discountAmount.toFixed(2) : "0.00"}<br/>
          GST: ₹${inv.gstAmount ? inv.gstAmount.toFixed(2) : "0.00"}<br/>
          <strong style="font-size: 14px; color: #0A3578;">GRAND TOTAL: ${inv.total}</strong>
        </div>

        ${inv.notes ? `
          <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 10px; margin-bottom: 20px; font-size: 11px; font-style: italic;">
            <strong>Notes:</strong> ${inv.notes}
          </div>
        ` : ""}

        <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; font-size: 10px; color: #94a3b8;">
          <p>This is a computer-generated invoice from Muneem Timber Store.</p>
          <p>For any queries, contact us at +91 9580716752 or email aaqilmansoorias@gmail.com.</p>
        </div>
      </div>
    `;

    const emailSent = await sendEmailNotification({
      subject: `Receipt for Invoice ${inv.invoiceNumber} - Muneem Timber Store`,
      html: emailHtml,
      to: email
    });

    if (emailSent) {
      return NextResponse.json({ success: true, message: "Invoice emailed successfully!" });
    } else {
      return NextResponse.json(
        { error: "Failed to send email. Check server logs." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Email Invoice API error:", error);
    return NextResponse.json(
      { error: "Server error sending email: " + error.message },
      { status: 500 }
    );
  }
}
