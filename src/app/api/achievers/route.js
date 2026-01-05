import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Achiever from "@/models/Achiever";

// GET all achievers
export async function GET()
{
          await connectDB();
          const achievers = await Achiever.find().sort({ createdAt: -1 });
          return NextResponse.json(achievers);
}

// CREATE achiever
export async function POST(req)
{
          await connectDB();
          const body = await req.json();

          const achiever = await Achiever.create(body);
          return NextResponse.json(achiever);
}

// UPDATE achiever
export async function PUT(req)
{
          await connectDB();
          const body = await req.json();
          const { id, ...data } = body;

          await Achiever.findByIdAndUpdate(id, data, { new: true });
          return NextResponse.json({ success: true });
}
