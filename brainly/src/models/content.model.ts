import { model, Schema } from "mongoose";
const contentSchema = new Schema(
  {
    title: String,
    link: String,
    tags: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      enum: ["youtube", "twitter", "document", "link", "other"], // ✅ enum added
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Content = model("Content", contentSchema);
