import dbConnect from "@/lib/mongodb";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const { email, name, password } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Saare fields enter karein!" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered!" },
        { status: 400 }
      );
    }

    // Save user (plain text password for simple virtual check as requested)
    const newUser = new User({
      name,
      email,
      password,
      role: email.toLowerCase().includes("admin") ? "admin" : "customer"
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Registration failed: " + error.message },
      { status: 500 }
    );
  }
}
