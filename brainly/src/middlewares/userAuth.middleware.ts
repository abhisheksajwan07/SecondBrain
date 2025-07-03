import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
declare global {
  namespace Express {
    interface Request {
      user?: typeof User.prototype;
    }
  }
}
export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};