import dbConnect from "@/lib/mongodb";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email aur password enter karein!" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password!" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Login failed: " + error.message },
      { status: 500 }
    );
  }
}
