import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Seat from "@/models/Seat";
import { SLOT_OVERLAPS } from "@/data/slotRules";
import mongoose from "mongoose";

/* ---------------- GET: fetch all seats ---------------- */
export async function GET()
{
  try
  {
    await connectDB();
    console.log("Connected DB name:", mongoose.connection.name);

    const seats = await Seat.find();
    return NextResponse.json(seats);
  } catch (error)
  {
    console.error("GET /api/seats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch seats" },
      { status: 500 }
    );
  }
}

/* ---------------- POST: book a seat slot ---------------- */
export async function POST(req)
{
  try
  {
    await connectDB();

    const { seatNumber, slotId } = await req.json();

    const seat = await Seat.findOne({ seatNumber });

    if (!seat)
    {
      return NextResponse.json(
        { error: "Seat not found" },
        { status: 404 }
      );
    }

    // Full-day reserved
    if (seat.reserved)
    {
      return NextResponse.json(
        { error: "Seat is reserved for the full day" },
        { status: 400 }
      );
    }

    // Slot already booked
    const directSlot = seat.slots.find(
      (s) => s.slotId === slotId && s.booked
    );

    if (directSlot)
    {
      return NextResponse.json(
        { error: "This slot is already booked" },
        { status: 400 }
      );
    }

    // Overlapping slot check
    const blockedSlots = SLOT_OVERLAPS[slotId] || [];

    const hasOverlap = seat.slots.some(
      (s) => s.booked && blockedSlots.includes(s.slotId)
    );

    if (hasOverlap)
    {
      return NextResponse.json(
        { error: "Overlapping slot already booked" },
        { status: 400 }
      );
    }

    // Book slot
    const existing = seat.slots.find((s) => s.slotId === slotId);

    if (existing)
    {
      existing.booked = true;
    } else
    {
      seat.slots.push({ slotId, booked: true });
    }

    await seat.save();
    return NextResponse.json(seat);
  } catch (error)
  {
    console.error("POST /api/seats error:", error);
    return NextResponse.json(
      { error: "Booking failed" },
      { status: 500 }
    );
  }
}
