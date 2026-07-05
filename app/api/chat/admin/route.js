import dbConnect from "@/lib/mongodb";
import { ChatMessage, OwnerStatus } from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    
    // Mark owner as active online
    await OwnerStatus.findOneAndUpdate(
      {},
      { lastActive: new Date() },
      { upsert: true, new: true }
    );

    // Get all sessions grouped by sessionId
    // Since MongoDB map-reduce or group might be complex, we can load all messages sorted by time desc, and filter unique sessionIds in JS
    const allMessages = await ChatMessage.find({}).sort({ timestamp: -1 });
    
    const sessionsMap = {};
    for (const msg of allMessages) {
      if (!sessionsMap[msg.sessionId]) {
        sessionsMap[msg.sessionId] = {
          sessionId: msg.sessionId,
          visitorName: msg.visitorName || "Guest",
          latestMessage: msg.text,
          sender: msg.sender,
          timestamp: msg.timestamp,
          unread: !msg.isReplied && msg.sender === "visitor"
        };
      }
    }
    
    const activeSessions = Object.values(sessionsMap).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return NextResponse.json({
      success: true,
      sessions: activeSessions
    });
  } catch (error) {
    console.error("Admin Chat GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { sessionId, text } = await request.json();
    
    if (!sessionId || !text) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Mark owner as active online
    await OwnerStatus.findOneAndUpdate(
      {},
      { lastActive: new Date() },
      { upsert: true, new: true }
    );

    // Save owner reply
    const msg = new ChatMessage({
      sessionId,
      sender: "owner",
      text,
      visitorName: "Faizal (Owner)",
      timestamp: new Date()
    });
    await msg.save();

    // Mark previous visitor messages as replied
    await ChatMessage.updateMany(
      { sessionId, sender: "visitor" },
      { $set: { isReplied: true } }
    );
    
    return NextResponse.json({ success: true, message: msg });
  } catch (error) {
    console.error("Admin Chat POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
