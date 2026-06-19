import dbConnect from "@/lib/mongodb";
import { Product } from "@/lib/models";
import { NextResponse } from "next/server";
import initialItems from "@/data/items";

export async function GET() {
  try {
    await dbConnect();
    let products = await Product.find({});
    
    // Seed initial products if database is empty
    if (products.length === 0) {
      console.log("Seeding products list in database...");
      await Product.insertMany(initialItems);
      products = await Product.find({});
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Products GET API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, price, stock } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Product name aur price are mandatory!" },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const dailyRate = parseFloat(price.replace(/[^\d.]/g, "")) || 0;

    const newProd = new Product({
      name,
      slug,
      desc: `${name} - High quality construction item`,
      price: `₹${dailyRate} per piece/day`,
      dailyRate: dailyRate,
      stock: parseInt(stock) || 100
    });

    await newProd.save();
    return NextResponse.json({ success: true, product: newProd });
  } catch (error) {
    console.error("Products POST API error:", error);
    return NextResponse.json(
      { error: "Failed to create product: " + error.message },
      { status: 500 }
    );
  }
}
