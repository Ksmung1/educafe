import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";
import { newsSeed } from "@/data/newsSeed";

async function ensureSeeded() {
  const count = await News.countDocuments();
  if (count === 0) {
    await News.insertMany(newsSeed);
  }
}

export async function GET() {
  try {
    await connectDB();
    await ensureSeeded();

    const items = await News.find().sort({ featured: -1, createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    console.error("GET /api/news error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      body: content,
      source,
      tag,
      tone = "gen",
      dateLabel,
      image = "",
      publicId = "",
      featured = false,
    } = body;

    if (!title || !content || !source || !tag || !dateLabel) {
      return NextResponse.json(
        { error: "title, body, source, tag, and dateLabel are required" },
        { status: 400 }
      );
    }

    if (featured) {
      await News.updateMany({}, { $set: { featured: false } });
    }

    const created = await News.create({
      title: title.trim(),
      body: content.trim(),
      source: source.trim(),
      tag: tag.trim(),
      tone: String(tone || "gen").trim(),
      dateLabel: dateLabel.trim(),
      image: image.trim(),
      publicId: publicId.trim(),
      featured: Boolean(featured),
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/news error:", error);
    return NextResponse.json({ error: "Failed to create news item" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      id,
      title,
      body: content,
      source,
      tag,
      tone = "gen",
      dateLabel,
      image = "",
      publicId = "",
      featured = false,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    if (!title || !content || !source || !tag || !dateLabel) {
      return NextResponse.json(
        { error: "title, body, source, tag, and dateLabel are required" },
        { status: 400 }
      );
    }

    // If this item is being set as featured, unset all others first
    if (featured) {
      await News.updateMany({ _id: { $ne: id } }, { $set: { featured: false } });
    }

    const updated = await News.findByIdAndUpdate(
      id,
      {
        $set: {
          title: title.trim(),
          body: content.trim(),
          source: source.trim(),
          tag: tag.trim(),
          tone: String(tone || "gen").trim(),
          dateLabel: dateLabel.trim(),
          image: image.trim(),
          publicId: publicId.trim(),
          featured: Boolean(featured),
        },
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/news error:", error);
    return NextResponse.json({ error: "Failed to update news item" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const deleted = await News.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/news error:", error);
    return NextResponse.json({ error: "Failed to delete news item" }, { status: 500 });
  }
}