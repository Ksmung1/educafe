import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Seat from "@/models/Seat";
import { seatNumbers } from "@/data/seatNumbers";

function normalizeSeat(doc) {
  return {
    seatNumber: Number(doc.seatNumber),
    state: doc.state || "available",
    name: doc.name || "",
    exam: doc.exam || "",
    shift: doc.shift || "",
  };
}

export async function GET() {
  try {
    await connectDB();
    const docs = await Seat.find().sort({ seatNumber: 1 }).lean();
    const bySeat = new Map(docs.map((doc) => [Number(doc.seatNumber), normalizeSeat(doc)]));

    const seats = seatNumbers.map((seatNumber) => (
      bySeat.get(seatNumber) || {
        seatNumber,
        state: "available",
        name: "",
        exam: "",
        shift: "",
      }
    ));

    return NextResponse.json(seats);
  } catch (error) {
    console.error("GET /api/seats error:", error);
    return NextResponse.json({ error: "Failed to fetch seats" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const seatNumber = Number(body.seatNumber);
    const state = body.state || "available";

    if (!seatNumber || !seatNumbers.includes(seatNumber)) {
      return NextResponse.json({ error: "Invalid seatNumber" }, { status: 400 });
    }

    if (!["available", "reserved", "shifting"].includes(state)) {
      return NextResponse.json({ error: "Invalid state" }, { status: 400 });
    }

    const payload = {
      seatNumber,
      state,
      name: state === "reserved" ? (body.name || "").trim() : "",
      exam: state === "reserved" ? (body.exam || "").trim() : "",
      shift: state === "shifting" ? (body.shift || "").trim() : state === "reserved" ? (body.shift || "").trim() : "",
    };

    const seat = await Seat.findOneAndUpdate(
      { seatNumber },
      payload,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(normalizeSeat(seat));
  } catch (error) {
    console.error("PUT /api/seats error:", error);
    return NextResponse.json({ error: "Failed to save seat" }, { status: 500 });
  }
}
