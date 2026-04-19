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
    gender: {
      type: String,
      enum: ["male", "female", ""],
      default: "",
      trim: true,
    },
    avatarId: {
      type: Number,
      default: null,
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

if (mongoose.models.Seat) {
  delete mongoose.models.Seat;
}

export default mongoose.model("Seat", SeatSchema);
