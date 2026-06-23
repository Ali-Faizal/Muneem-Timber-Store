import dbConnect from "@/lib/mongodb";
import { ServiceRequest, Worker, ActivityLog, DashboardNotification } from "@/lib/models";
import { sendEmailNotification } from "@/lib/email";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    // Populate the assigned worker information
    const requests = await ServiceRequest.find({})
      .populate("assignedWorker")
      .sort({ createdAt: -1 });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("ServiceRequests GET API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { customerName, customerPhone, customerAddress, serviceType, bookingDate, notes } = body;

    if (!customerName || !customerPhone || !customerAddress || !serviceType || !bookingDate) {
      return NextResponse.json(
        { error: "Name, phone, address, service type, and booking date are mandatory!" },
        { status: 400 }
      );
    }

    const newRequest = new ServiceRequest({
      customerName,
      customerPhone,
      customerAddress,
      serviceType: serviceType.toLowerCase(),
      bookingDate,
      notes: notes || "",
      status: "Pending",
      assignedWorker: null,
    });

    await newRequest.save();

    // 1. Log Activity Log
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" });
    const log = new ActivityLog({
      action: "New Booking",
      user: customerName,
      date,
      time,
      affectedRecord: `Service: ${serviceType.toUpperCase()}, Phone: ${customerPhone}`
    });
    await log.save();

    // 2. Create Dashboard Notification
    const notification = new DashboardNotification({
      type: "order",
      title: "🔔 New Order Received",
      message: `Customer Name: ${customerName}, Phone: ${customerPhone}, Service Type: ${serviceType.toUpperCase()}, Address: ${customerAddress}, Booking Date: ${bookingDate}, Notes: ${notes || "None"}, Status: Pending`
    });
    await notification.save();

    // 3. Dispatch Email Alert (Nodemailer)
    const emailSubject = "New Order Received - Muneem Timber Store";
    const emailText = `New Service Order Alert:\n\nCustomer Name: ${customerName}\nMobile Number: ${customerPhone}\nService Type: ${serviceType.toUpperCase()}\nAddress: ${customerAddress}\nRequired Date: ${bookingDate}\nNotes: ${notes || "None"}\nBooking Time: ${date} ${time}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #FF6B2B; border-radius: 12px; max-width: 500px;">
        <h2 style="color: #FF6B2B; margin-top: 0;">Muneem Timber Store</h2>
        <h3 style="color: #333;">🔔 New Service Order Received</h3>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 5px 0; font-weight: bold; width: 140px;">Customer Name:</td><td>${customerName}</td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">Mobile Number:</td><td>${customerPhone}</td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">Service Type:</td><td style="text-transform: uppercase; font-weight: bold; color: #1251A3;">${serviceType}</td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">Site Address:</td><td>${customerAddress}</td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">Required Date:</td><td>${bookingDate}</td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">Notes:</td><td>${notes || "None"}</td></tr>
          <tr><td style="padding: 5px 0; font-weight: bold;">Booking Time:</td><td>${date} ${time}</td></tr>
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
    }).catch(err => console.error("Booking order email delivery failed:", err));

    return NextResponse.json({ success: true, request: newRequest });
  } catch (error) {
    console.error("ServiceRequests POST API error:", error);
    return NextResponse.json(
      { error: "Failed to submit request: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id, status, assignedWorkerId } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Request ID parameter is mandatory!" },
        { status: 400 }
      );
    }

    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (assignedWorkerId !== undefined) {
      updateData.assignedWorker = assignedWorkerId ? assignedWorkerId : null;
      if (assignedWorkerId && status === "Pending") {
        updateData.status = "Worker Assigned";
      }
    }

    const originalReq = await ServiceRequest.findById(id);
    const updatedReq = await ServiceRequest.findByIdAndUpdate(id, updateData, { new: true })
      .populate("assignedWorker");

    if (!updatedReq) {
      return NextResponse.json(
        { error: "Booking request not found!" },
        { status: 404 }
      );
    }

    // Write Activity Log for status update/assignment
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" });
    
    let actionName = "Booking Status Update";
    if (status === "Completed") actionName = "Booking Completed";
    else if (status === "Cancelled") actionName = "Booking Cancelled";
    else if (assignedWorkerId && originalReq.assignedWorker?.toString() !== assignedWorkerId) actionName = "Booking Assigned";

    const log = new ActivityLog({
      action: actionName,
      user: "owner", // Performed by owner
      date,
      time,
      affectedRecord: `Booking ID: ${id}, Customer: ${updatedReq.customerName}, Status: ${updatedReq.status}`
    });
    await log.save();

    return NextResponse.json({ success: true, request: updatedReq });
  } catch (error) {
    console.error("ServiceRequests PUT API error:", error);
    return NextResponse.json(
      { error: "Failed to update request: " + error.message },
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
        { error: "Request ID parameter is required!" },
        { status: 400 }
      );
    }

    const deletedReq = await ServiceRequest.findByIdAndDelete(id);
    if (!deletedReq) {
      return NextResponse.json(
        { error: "Booking request not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ServiceRequests DELETE API error:", error);
    return NextResponse.json(
      { error: "Failed to delete request: " + error.message },
      { status: 500 }
    );
  }
}
