import mongoose, { Model, model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
interface Iuser extends Document {
  emailId: string;
  username: string; // Adjusted to match schema and avoid type errors
  password: string;
  getJWT(): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}
const userSchema = new Schema<Iuser>(
  {
    emailId: { type: String, unique: true },
    username: {
      type: String,
      required: true,
    },

    password: String,
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function (): Promise<string> {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (
  passwordInputByUser: string
): Promise<boolean> {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password as string, 10);
  }
  next();
});
export const User: Model<Iuser> = model<Iuser>("User", userSchema);

// model<Iuser>(...) fucntion to create model
