import dbConnect from "@/lib/mongodb";
import { ActivityLog } from "@/lib/models";
import { verifySession } from "@/lib/auth-edge";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    // Enforce owner session verification for fetching security logs
    const session = request.cookies.get("owner_session")?.value;
    const isValid = await verifySession(session);
    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const actionFilter = searchParams.get("action") || "";

    const query = {};

    if (actionFilter) {
      query.action = actionFilter;
    }

    if (search) {
      query.$or = [
        { action: { $regex: search, $options: "i" } },
        { user: { $regex: search, $options: "i" } },
        { affectedRecord: { $regex: search, $options: "i" } }
      ];
    }

    const logs = await ActivityLog.find(query)
      .sort({ timestamp: -1 })
      .limit(100); // Caps at 100 recent entries for rendering

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Activity Logs GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
