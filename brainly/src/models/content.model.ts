import { model, Schema } from "mongoose";
const contentSchema = new Schema(
  {
    title: String,
    link: String,
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    type: String,
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Content = model("Content", contentSchema);
