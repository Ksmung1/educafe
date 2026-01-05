import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  slotId: String, // SLOT_1, SLOT_2, etc.
  booked: {
    type: Boolean,
    default: false,
  },
});

const SeatSchema = new mongoose.Schema({
  seatNumber: Number,

  // Full-day lock
  reserved: {
    type: Boolean,
    default: false,
  },

  // Slot-based bookings
  slots: [SlotSchema],
});

export default mongoose.models.Seat ||
  mongoose.model("Seat", SeatSchema);
