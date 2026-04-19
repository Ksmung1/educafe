import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    source: { type: String, required: true, trim: true },
    tag: { type: String, required: true, trim: true },
    tone: { type: String, default: "gen", trim: true },
    dateLabel: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    publicId: { type: String, default: "" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.News || mongoose.model("News", NewsSchema);
