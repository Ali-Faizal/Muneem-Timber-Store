import dbConnect from "@/lib/mongodb";
import { Order, Invoice, WalkinBill } from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    let query = {};
    if (email) {
      query.email = email;
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders GET API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const {
      customer,
      phone,
      email,
      address,
      projectLocation,
      startDate,
      endDate,
      total,
      duration,
      itemsCount,
      method,
      items
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

    // 1. Create the Order
    const newOrder = new Order({
      invoiceNumber,
      customer,
      phone,
      email,
      address,
      projectLocation,
      bookingDate: new Date().toISOString().split("T")[0],
      startDate,
      endDate,
      total,
      status: "New Order",
      duration,
      itemsCount,
      method,
      items
    });

    await newOrder.save();

    // Parse subtotal, gst, discount details for the Invoice record
    const dailyTotal = items.reduce((acc, item) => acc + (item.quantity * item.dailyRate), 0);
    const days = parseInt(duration) || 1;
    const subtotal = dailyTotal * days;
    const grandTotalVal = parseFloat(String(total).replace(/[^\d.]/g, "")) || 0;
    
    // 2. Create matching Invoice
    const newInvoice = new Invoice({
      invoiceNumber,
      customer,
      phone,
      address,
      projectLocation,
      startDate,
      endDate,
      bookingDate: newOrder.bookingDate,
      duration,
      items,
      subtotal: subtotal,
      discountAmount: 0,
      gstAmount: 0,
      total: total,
      gstApplied: false,
      notes: "Online booking receipt",
      status: "New Order",
      method,
      type: "Online"
    });

    await newInvoice.save();

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Orders POST API error:", error);
    return NextResponse.json(
      { error: "Failed to create order: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id, status, customer, phone, address, projectLocation, startDate, endDate, total } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Order ID parameter is mandatory!" },
        { status: 400 }
      );
    }

    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (customer !== undefined) updateData.customer = customer;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;
    if (projectLocation !== undefined) updateData.projectLocation = projectLocation;
    if (startDate !== undefined) updateData.startDate = startDate;
    if (endDate !== undefined) updateData.endDate = endDate;
    if (total !== undefined) updateData.total = total;

    // Update order in database
    const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
    if (!order) {
      return NextResponse.json(
        { error: "Order not found!" },
        { status: 404 }
      );
    }

    // Cascade sync updates to the corresponding Invoice record
    const invoiceUpdate = { ...updateData };
    delete invoiceUpdate.status;
    if (status !== undefined) invoiceUpdate.status = status;

    await Invoice.findOneAndUpdate({ invoiceNumber: order.invoiceNumber }, invoiceUpdate);

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Orders PUT API error:", error);
    return NextResponse.json(
      { error: "Failed to update order: " + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Order ID parameter is required!" },
        { status: 400 }
      );
    }

    const order = await Order.findByIdAndDelete(id);
    if (order) {
      // Also delete the linked invoice
      await Invoice.findOneAndDelete({ invoiceNumber: order.invoiceNumber });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Orders DELETE API error:", error);
    return NextResponse.json(
      { error: "Failed to delete order: " + error.message },
      { status: 500 }
    );
  }
}
