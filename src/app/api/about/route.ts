import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import About from "@/models/About";

export async function GET() {
  try {
    await connectDB();
    const about = await About.findOne().lean();
    return NextResponse.json(about || {});
  } catch (error) {
    console.error("Error fetching about:", error);
    return NextResponse.json(
      { error: "Failed to fetch about information" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    // Check if about document exists
    const existing = await About.findOne();
    
    if (existing) {
      // Update existing
      const updated = await About.findByIdAndUpdate(existing._id, data, {
        new: true,
      });
      return NextResponse.json(updated);
    } else {
      // Create new
      const about = await About.create(data);
      return NextResponse.json(about);
    }
  } catch (error) {
    console.error("Error saving about:", error);
    return NextResponse.json(
      { error: "Failed to save about information" },
      { status: 500 }
    );
  }
}
