import dbConnect from "@/lib/mongodb";
import { Owner, ActivityLog } from "@/lib/models";
import { verifySession } from "@/lib/auth-edge";
import { hashPassword } from "@/lib/auth-node";
import { NextResponse } from "next/server";

// Verify active session helper
async function checkAuth(request) {
  const session = request.cookies.get("owner_session")?.value;
  return await verifySession(session);
}

// GET: Fetch current owner settings details
export async function GET(request) {
  try {
    await dbConnect();
    const session = request.cookies.get("owner_session")?.value;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const [username] = session.split(":");

    const owner = await Owner.findOne({ username }).select("-password");
    if (!owner) {
      return NextResponse.json({ error: "Owner not found" }, { status: 404 });
    }

    return NextResponse.json(owner);
  } catch (error) {
    console.error("Owner Settings GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT/POST: Update Owner Account Settings
export async function PUT(request) {
  try {
    await dbConnect();
    const session = request.cookies.get("owner_session")?.value;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const [sessionUsername] = session.split(":");

    const body = await request.json();
    const { username, password, recoveryDetails, recoveryEmail } = body;

    const owner = await Owner.findOne({ username: sessionUsername });
    if (!owner) {
      return NextResponse.json({ error: "Owner account not found" }, { status: 404 });
    }

    const updateData = {};
    if (username && username !== owner.username) {
      // Check if new username is already taken
      const exists = await Owner.findOne({ username });
      if (exists) {
        return NextResponse.json({ error: "Username already taken!" }, { status: 400 });
      }
      updateData.username = username;
    }
    if (password) {
      updateData.password = hashPassword(password);
    }
    if (recoveryDetails !== undefined) {
      updateData.recoveryDetails = recoveryDetails;
    }
    
    let emailChanged = false;
    if (recoveryEmail !== undefined && recoveryEmail !== owner.recoveryEmail) {
      const approvedEmails = ["faizmsri@gmail.com", "aaqilmansoorias@gmail.com"];
      const isApproved = approvedEmails.includes(recoveryEmail.toLowerCase());
      if (!isApproved) {
        return NextResponse.json(
          { error: "Recovery Email must be an approved email address!" },
          { status: 400 }
        );
      }
      updateData.recoveryEmail = recoveryEmail;
      updateData.isEmailVerified = false;
      emailChanged = true;
    }

    const updatedOwner = await Owner.findOneAndUpdate(
      { username: sessionUsername },
      updateData,
      { new: true }
    );

    // Write Activity Logs for edits
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" });

    if (username && username !== owner.username) {
      const uLog = new ActivityLog({
        action: "Username Changed",
        user: sessionUsername,
        date,
        time,
        affectedRecord: `New Username: ${username}`
      });
      await uLog.save();
    }
    if (password) {
      const pLog = new ActivityLog({
        action: "Password Changed",
        user: sessionUsername,
        date,
        time,
        affectedRecord: `Owner credentials updated`
      });
      await pLog.save();
    }
    if (recoveryDetails || recoveryEmail) {
      const sLog = new ActivityLog({
        action: "Settings Changes",
        user: sessionUsername,
        date,
        time,
        affectedRecord: "Recovery metadata updated"
      });
      await sLog.save();
    }

    // Refresh Owner Session
    const currentUsername = username || owner.username;
    const currentEmail = recoveryEmail || owner.recoveryEmail;
    const currentVerified = emailChanged ? "false" : String(updatedOwner.isEmailVerified);

    const expiryTimestamp = Date.now() + 24 * 60 * 60 * 1000;
    const newSessionToken = await signSession(currentUsername, currentEmail, currentVerified, expiryTimestamp);

    const response = NextResponse.json({ 
      success: true, 
      requiresVerification: emailChanged,
      email: currentEmail,
      owner: { username: currentUsername } 
    });

    response.cookies.set("owner_session", newSessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(expiryTimestamp),
      sameSite: "strict"
    });

    return response;
  } catch (error) {
    console.error("Owner Settings PUT error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Handle Logout
export async function DELETE(request) {
  try {
    await dbConnect();
    const session = request.cookies.get("owner_session")?.value;
    const username = session ? session.split(":")[0] : "owner";

    // Write Logout Log
    const date = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" });
    const logoutLog = new ActivityLog({
      action: "Owner Logout",
      user: username,
      date,
      time,
      affectedRecord: "Session destroyed"
    });
    await logoutLog.save();

    const response = NextResponse.json({ success: true, message: "Logged out successfully!" });
    // Destroy the HttpOnly owner session cookie
    response.cookies.set("owner_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
      sameSite: "strict"
    });

    return response;
  } catch (error) {
    console.error("Owner Settings DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
