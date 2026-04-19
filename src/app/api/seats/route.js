import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Seat from "@/models/Seat";
import { seatNumbers } from "@/data/seatNumbers";

function normalizeSeat(doc) {
  const avatarId = Number(doc.avatarId);

  return {
    seatNumber: Number(doc.seatNumber),
    state: doc.state || "available",
    name: doc.name || "",
    gender: doc.gender || "",
    avatarId: Number.isFinite(avatarId) && avatarId > 0 ? avatarId : null,
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
        gender: "",
        avatarId: null,
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
    const gender = ["male", "female"].includes(body.gender) ? body.gender : "";
    const parsedAvatarId = Number(body.avatarId);
    const avatarId = Number.isFinite(parsedAvatarId) && parsedAvatarId > 0 ? parsedAvatarId : null;

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
      gender,
      avatarId,
      exam: state === "reserved" ? (body.exam || "").trim() : "",
      shift: state === "shifting" ? (body.shift || "").trim() : state === "reserved" ? (body.shift || "").trim() : "",
    };

    const seat = await Seat.findOneAndUpdate(
      { seatNumber },
      payload,
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );

    return NextResponse.json(normalizeSeat(seat));
  } catch (error) {
    console.error("PUT /api/seats error:", error);
    return NextResponse.json({ error: "Failed to save seat" }, { status: 500 });
  }
}
