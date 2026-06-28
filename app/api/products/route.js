import dbConnect from "@/lib/mongodb";
import { Product } from "@/lib/models";
import { NextResponse } from "next/server";
import initialItems from "@/data/items";

let productsCache = null;
let lastFetchTime = 0;
const CACHE_TTL = 60000; // 60 seconds cache for hyper-fast response times

function clearProductsCache() {
  productsCache = null;
  lastFetchTime = 0;
}

export async function GET() {
  try {
    const now = Date.now();
    if (productsCache && (now - lastFetchTime < CACHE_TTL)) {
      return NextResponse.json(productsCache);
    }

    await dbConnect();
    let products = await Product.find({}).sort({ id: 1 }).lean();
    
    // Seed initial products if database is empty
    if (products.length === 0) {
      console.log("Seeding products list in database...");
      await Product.insertMany(initialItems);
      products = await Product.find({}).sort({ id: 1 }).lean();
    }

    productsCache = products;
    lastFetchTime = now;

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
    const { name, price, stock, icon } = body;

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
      stock: parseInt(stock) || 100,
      icon: icon || "🪵"
    });

    await newProd.save();
    clearProductsCache();
    return NextResponse.json({ success: true, product: newProd });
  } catch (error) {
    console.error("Products POST API error:", error);
    return NextResponse.json(
      { error: "Failed to create product: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { _id, name, price, stock, icon } = body;

    if (!_id) {
      return NextResponse.json(
        { error: "Product ID (_id) is mandatory for edit!" },
        { status: 400 }
      );
    }

    if (!name || !price) {
      return NextResponse.json(
        { error: "Product name aur price are mandatory!" },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    const numericPrice = typeof price === "string" ? price.replace(/[^\d.]/g, "") : price;
    const dailyRate = parseFloat(numericPrice) || 0;

    const updatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
        name,
        slug,
        desc: `${name} - High quality construction item`,
        price: `₹${dailyRate} per piece/day`,
        dailyRate: dailyRate,
        stock: parseInt(stock) || 0,
        icon: icon || "🪵"
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Product not found!" },
        { status: 404 }
      );
    }

    clearProductsCache();
    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Products PUT API error:", error);
    return NextResponse.json(
      { error: "Failed to update product: " + error.message },
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
        { error: "Product ID (id) query parameter is mandatory!" },
        { status: 400 }
      );
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { error: "Product not found!" },
        { status: 404 }
      );
    }

    clearProductsCache();
    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Products DELETE API error:", error);
    return NextResponse.json(
      { error: "Failed to delete product: " + error.message },
      { status: 500 }
    );
  }
}
