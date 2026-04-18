import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export async function GET() {
  try {
    await connectDB();
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json(gallery);
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { label, image, width, height, aspectRatio, publicId = "" } = body;

    if (!label || !image || !width || !height || !aspectRatio) {
      return NextResponse.json(
        { error: "Label, image, width, height, and aspectRatio are required" },
        { status: 400 }
      );
    }

    const created = await Gallery.create({
      label,
      image,
      width: Number(width),
      height: Number(height),
      aspectRatio: Number(aspectRatio),
      publicId,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const deleted = await Gallery.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/gallery error:", error);
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
  }
}

