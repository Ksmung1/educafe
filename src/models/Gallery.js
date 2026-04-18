import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    aspectRatio: { type: Number, required: true },
    publicId: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);

