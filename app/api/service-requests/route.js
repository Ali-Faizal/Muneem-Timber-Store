import dbConnect from "@/lib/mongodb";
import { ServiceRequest, Worker } from "@/lib/models";
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
      // If empty string or null, set to null
      updateData.assignedWorker = assignedWorkerId ? assignedWorkerId : null;
      if (assignedWorkerId && status === "Pending") {
        updateData.status = "Worker Assigned";
      }
    }

    const updatedReq = await ServiceRequest.findByIdAndUpdate(id, updateData, { new: true })
      .populate("assignedWorker");

    if (!updatedReq) {
      return NextResponse.json(
        { error: "Booking request not found!" },
        { status: 404 }
      );
    }

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
