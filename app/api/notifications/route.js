import dbConnect from "@/lib/mongodb";
import { DashboardNotification } from "@/lib/models";
import { verifySession } from "@/lib/auth-edge";
import { NextResponse } from "next/server";

// Enforce authentication
async function checkAuth(request) {
  const session = request.cookies.get("owner_session")?.value;
  return await verifySession(session);
}

export async function GET(request) {
  try {
    await dbConnect();
    const authorized = await checkAuth(request);
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const includeRead = searchParams.get("includeRead") === "true";

    const query = {};
    if (!includeRead) {
      query.read = false;
    }

    const notifications = await DashboardNotification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Notifications GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Mark notifications as read
export async function PUT(request) {
  try {
    await dbConnect();
    const authorized = await checkAuth(request);
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, all } = body;

    if (all) {
      await DashboardNotification.updateMany({ read: false }, { read: true });
    } else if (id) {
      await DashboardNotification.findByIdAndUpdate(id, { read: true });
    } else {
      return NextResponse.json({ error: "ID or all parameter is required" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notifications PUT error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
