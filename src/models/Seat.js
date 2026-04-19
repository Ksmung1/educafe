import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema(
  {
    seatNumber: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    state: {
      type: String,
      enum: ["available", "reserved", "shifting"],
      default: "available",
    },
    name: {
      type: String,
      default: "",
      trim: true,
    },
    exam: {
      type: String,
      default: "",
      trim: true,
    },
    shift: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Seat || mongoose.model("Seat", SeatSchema);
