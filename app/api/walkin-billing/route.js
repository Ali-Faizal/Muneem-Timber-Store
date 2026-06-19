import dbConnect from "@/lib/mongodb";
import { WalkinBill, Invoice, Order } from "@/lib/models";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      customer,
      phone,
      address,
      projectLocation,
      startDate,
      endDate,
      duration,
      items,
      subtotal,
      discountAmount,
      gstAmount,
      total,
      gstApplied,
      discountOption,
      manualDiscountVal,
      notes,
      status,
      method
    } = body;

    if (!customer) {
      return NextResponse.json(
        { error: "Customer name is mandatory!" },
        { status: 400 }
      );
    }

    // Auto increment invoice number MTS-2026-XXXX
    const ordersCount = await Order.countDocuments({});
    const walkinCount = await WalkinBill.countDocuments({});
    const nextSeq = String(ordersCount + walkinCount + 1).padStart(4, "0");
    const invoiceNumber = `MTS-2026-${nextSeq}`;

    // 1. Create the Walk-In Bill
    const newWalkin = new WalkinBill({
      invoiceNumber,
      customer,
      phone,
      address,
      projectLocation,
      startDate,
      endDate,
      bookingDate: new Date().toISOString().split("T")[0],
      duration,
      items,
      subtotal,
      discountAmount,
      gstAmount,
      total,
      gstApplied,
      discountOption,
      manualDiscountVal,
      notes,
      status: status || "Confirmed",
      method: method || "CASH"
    });

    await newWalkin.save();

    // 2. Create the unified Invoice
    const newInvoice = new Invoice({
      invoiceNumber,
      customer,
      phone,
      address,
      projectLocation,
      startDate,
      endDate,
      bookingDate: newWalkin.bookingDate,
      duration,
      items,
      subtotal,
      discountAmount,
      gstAmount,
      total,
      gstApplied,
      notes,
      status: status || "Confirmed",
      method: method || "CASH",
      type: "Walk-In"
    });

    await newInvoice.save();

    return NextResponse.json({ success: true, bill: newWalkin });
  } catch (error) {
    console.error("Walkin POST API error:", error);
    return NextResponse.json(
      { error: "Failed to create walkin bill: " + error.message },
      { status: 500 }
    );
  }
}
