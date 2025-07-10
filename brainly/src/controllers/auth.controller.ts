import { Request, Response } from "express";
import { User } from "../models/user.model";

export const signupUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // console.log("BODY:", req.body);
    const { emailId, password } = req.body;
    console.log("body", req.body);
    const user = new User({ emailId, password });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", // true in prod
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(201)
      .json({
        message: "user signed up",
        user: {
          id: savedUser._id,
          emailId: savedUser.emailId,
        },
      });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(411).json({ message: err.message });
    } else {
      res.json({ message: "Something went wrong" });
    }
  }
};

export const signInUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // console.log("BODY RECEIVED:", req.body);
    // console.log("HEADERS:", req.headers);
    // console.log("BODY TYPE:", typeof req.body);
    // console.log("BODY RAW:", req.body);

    const { emailId, password } = req.body;

    const existingUser = await User.findOne({ emailId });
    if (!existingUser) {
      res.status(403).json({
        message: "Incorrect Credentials",
      });
      return;
    }
    const isPasswordValid = await existingUser.validatePassword(password);
    if (!isPasswordValid) {
      res.status(403).json({ message: "Incorrect credentials" });
      return;
    }

    const token = await existingUser.getJWT();

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "User signed in successfully",
        user: {
          id: existingUser._id,
          emailId: existingUser.emailId,
        },
      });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(411).json({ message: err.message });
    } else {
      res.json({ message: "Something went wrong" });
    }
  }
};
