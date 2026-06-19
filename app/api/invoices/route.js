import dbConnect from "@/lib/mongodb";
import { Invoice, WalkinBill, Order } from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const invoices = await Invoice.find({}).sort({ createdAt: -1 });
    return NextResponse.json(invoices);
  } catch (error) {
    console.error("Invoices GET API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { invoiceNumber, customer, phone, address, projectLocation, notes } = body;

    if (!invoiceNumber) {
      return NextResponse.json(
        { error: "Invoice number is required!" },
        { status: 400 }
      );
    }

    // 1. Update Invoice collection
    const invoice = await Invoice.findOneAndUpdate(
      { invoiceNumber },
      { customer, phone, address, projectLocation, notes },
      { new: true }
    );

    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice not found!" },
        { status: 404 }
      );
    }

    // 2. Cascade update to underlying model
    if (invoice.type === "Walk-In") {
      await WalkinBill.findOneAndUpdate(
        { invoiceNumber },
        { customer, phone, address, projectLocation, notes }
      );
    } else {
      await Order.findOneAndUpdate(
        { invoiceNumber },
        { customer, phone, address, projectLocation }
      );
    }

    return NextResponse.json({ success: true, invoice });
  } catch (error) {
    console.error("Invoices PUT API error:", error);
    return NextResponse.json(
      { error: "Failed to update invoice: " + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const invoiceNumber = searchParams.get("invoiceNumber");

    if (!invoiceNumber) {
      return NextResponse.json(
        { error: "Invoice number parameter is required!" },
        { status: 400 }
      );
    }

    // 1. Delete Invoice record
    const invoice = await Invoice.findOneAndDelete({ invoiceNumber });
    if (invoice) {
      // 2. Cascade delete from underlying collections
      if (invoice.type === "Walk-In") {
        await WalkinBill.findOneAndDelete({ invoiceNumber });
      } else {
        await Order.findOneAndDelete({ invoiceNumber });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Invoices DELETE API error:", error);
    return NextResponse.json(
      { error: "Failed to delete invoice: " + error.message },
      { status: 500 }
    );
  }
}
