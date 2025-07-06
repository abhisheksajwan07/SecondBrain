import { Schema, model, Model, Document, Types } from "mongoose";
interface ILink extends Document {
  hash: string;
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
const linkSchema = new Schema<ILink>(
  {
    hash: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Link: Model<ILink> = model<ILink>("Link", linkSchema);
