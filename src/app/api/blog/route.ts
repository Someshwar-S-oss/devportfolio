import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

// GET /api/blog - Get all blog posts (published only for public, all for admin)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");
    const all = searchParams.get("all"); // For admin to get all posts

    let query: any = all === "true" ? {} : { published: true };
    if (tag) {
      query.tags = tag;
    }

    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: posts });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const post = await BlogPost.create(body);

    return NextResponse.json(
      { success: true, data: post },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
