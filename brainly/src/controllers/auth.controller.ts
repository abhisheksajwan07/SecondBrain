import { Request, Response } from "express";
import { User } from "../models/user.model";

export const signupUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // console.log("BODY:", req.body); 
    const { username, password } = req.body;
    const user = new User({ username, password });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.status(201).json({
      message: "user signed up",
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
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
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
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

    res.json({
      message: "User signed in successfully",
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
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
