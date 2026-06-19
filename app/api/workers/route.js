import dbConnect from "@/lib/mongodb";
import { Worker } from "@/lib/models";
import { NextResponse } from "next/server";

// Sample mock data for seeding if empty
const seedWorkers = [
  {
    name: "Ram Bahadur Mistri",
    category: "mistri",
    experience: "15+ Years",
    dailyRate: 1000,
    skills: ["Brick Work", "Plastering", "Flooring & Tiles", "Roof Casting"],
    availability: true,
    rating: 4.9,
    location: "Hardoi",
    phone: "9580716752",
    whatsapp: "919580716752",
    photoUrl: "", // Default avatar used on frontend if empty
  },
  {
    name: "Shamshad Alam",
    category: "mistri",
    experience: "12+ Years",
    dailyRate: 950,
    skills: ["Plastering", "POP Expert", "Brick Construction", "Repair"],
    availability: true,
    rating: 4.8,
    location: "Shahabad, Hardoi",
    phone: "9580716752",
    whatsapp: "919580716752",
    photoUrl: "",
  },
  {
    name: "Vinod Kumar Plumber",
    category: "plumber",
    experience: "10+ Years",
    dailyRate: 700,
    skills: ["Bathroom Fitting", "Pipeline Layout", "Drainage repairs", "Taps & Showers"],
    availability: true,
    rating: 4.8,
    location: "Hardoi",
    phone: "9580716752",
    whatsapp: "919580716752",
    photoUrl: "",
  },
  {
    name: "Irfan Ansari",
    category: "plumber",
    experience: "8+ Years",
    dailyRate: 650,
    skills: ["Leakage Fixes", "Kitchen plumbing", "Water tank setup"],
    availability: true,
    rating: 4.7,
    location: "Sandi, Hardoi",
    phone: "9580716752",
    whatsapp: "919580716752",
    photoUrl: "",
  },
  {
    name: "Sunil Dutt Electrician",
    category: "electrician",
    experience: "9+ Years",
    dailyRate: 750,
    skills: ["Complete House Wiring", "Switchboard Install", "MCB Panel repair", "Short Circuit Repair"],
    availability: true,
    rating: 4.9,
    location: "Hardoi",
    phone: "9580716752",
    whatsapp: "919580716752",
    photoUrl: "",
  },
  {
    name: "Zahid Khan",
    category: "electrician",
    experience: "7+ Years",
    dailyRate: 700,
    skills: ["Inverter Fitting", "Fan & AC wiring", "LED setup", "General Repair"],
    availability: true,
    rating: 4.7,
    location: "Sandila, Hardoi",
    phone: "9580716752",
    whatsapp: "919580716752",
    photoUrl: "",
  },
  {
    name: "Pappu Yadav Helper",
    category: "emergency-manpower",
    experience: "5+ Years",
    dailyRate: 500,
    skills: ["Heavy lifting", "Cement mixing", "Shuttering support", "Site Cleaning"],
    availability: true,
    rating: 4.6,
    location: "Hardoi",
    phone: "9580716752",
    whatsapp: "919580716752",
    photoUrl: "",
  },
  {
    name: "Rohit Lal Labor",
    category: "emergency-manpower",
    experience: "4+ Years",
    dailyRate: 480,
    skills: ["Excavation", "Material moving", "Construction Helper"],
    availability: true,
    rating: 4.5,
    location: "Pihani, Hardoi",
    phone: "9580716752",
    whatsapp: "919580716752",
    photoUrl: "",
  }
];

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = {};
    if (category) {
      query.category = category.toLowerCase();
    }

    let workers = await Worker.find(query).sort({ createdAt: -1 });

    // Seed initial workers if empty and querying all or seeding matches
    if (workers.length === 0 && !category) {
      console.log("Seeding workers list in database...");
      await Worker.insertMany(seedWorkers);
      workers = await Worker.find({}).sort({ createdAt: -1 });
    } else if (workers.length === 0 && category) {
      // Check if total collection is empty. If so, seed all, then filter
      const totalCount = await Worker.countDocuments({});
      if (totalCount === 0) {
        await Worker.insertMany(seedWorkers);
        workers = await Worker.find(query).sort({ createdAt: -1 });
      }
    }

    return NextResponse.json(workers);
  } catch (error) {
    console.error("Workers GET API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch workers: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, category, experience, dailyRate, skills, availability, location, phone, whatsapp, photoUrl } = body;

    if (!name || !category || !dailyRate) {
      return NextResponse.json(
        { error: "Name, category, and dailyRate are mandatory!" },
        { status: 400 }
      );
    }

    // Process skills into array if it's a string
    let parsedSkills = [];
    if (Array.isArray(skills)) {
      parsedSkills = skills;
    } else if (typeof skills === "string") {
      parsedSkills = skills.split(",").map(s => s.trim()).filter(Boolean);
    }

    const newWorker = new Worker({
      name,
      category: category.toLowerCase(),
      experience: experience || "1+ Year",
      dailyRate: Number(dailyRate),
      skills: parsedSkills,
      availability: availability !== undefined ? availability : true,
      rating: 4.8,
      location: location || "Hardoi",
      phone: phone || "9580716752",
      whatsapp: whatsapp || "919580716752",
      photoUrl: photoUrl || "",
    });

    await newWorker.save();
    return NextResponse.json({ success: true, worker: newWorker });
  } catch (error) {
    console.error("Workers POST API error:", error);
    return NextResponse.json(
      { error: "Failed to create worker: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id, name, category, experience, dailyRate, skills, availability, location, phone, whatsapp, photoUrl } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Worker ID parameter is mandatory!" },
        { status: 400 }
      );
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category.toLowerCase();
    if (experience !== undefined) updateData.experience = experience;
    if (dailyRate !== undefined) updateData.dailyRate = Number(dailyRate);
    if (location !== undefined) updateData.location = location;
    if (phone !== undefined) updateData.phone = phone;
    if (whatsapp !== undefined) updateData.whatsapp = whatsapp;
    if (photoUrl !== undefined) updateData.photoUrl = photoUrl;
    if (availability !== undefined) updateData.availability = availability;

    if (skills !== undefined) {
      if (Array.isArray(skills)) {
        updateData.skills = skills;
      } else if (typeof skills === "string") {
        updateData.skills = skills.split(",").map(s => s.trim()).filter(Boolean);
      }
    }

    const worker = await Worker.findByIdAndUpdate(id, updateData, { new: true });
    if (!worker) {
      return NextResponse.json(
        { error: "Worker not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, worker });
  } catch (error) {
    console.error("Workers PUT API error:", error);
    return NextResponse.json(
      { error: "Failed to update worker: " + error.message },
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
        { error: "Worker ID parameter is required!" },
        { status: 400 }
      );
    }

    const worker = await Worker.findByIdAndDelete(id);
    if (!worker) {
      return NextResponse.json(
        { error: "Worker not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Workers DELETE API error:", error);
    return NextResponse.json(
      { error: "Failed to delete worker: " + error.message },
      { status: 500 }
    );
  }
}
