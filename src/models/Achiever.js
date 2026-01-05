import mongoose from "mongoose";

const AchieverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    exam: { type: String, required: true },
    year: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Achiever ||
  mongoose.model("Achiever", AchieverSchema);
