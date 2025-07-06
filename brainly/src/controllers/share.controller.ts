import { Request, Response } from "express";
import { Link } from "../models/link.model";
import { generateHash } from "../utils/generateHash";
import { Content } from "../models/content.model";
import { User } from "../models/user.model";

export const shareContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { share } = req.body;
    if (share) {
      const shareLink = await Link.findOne({
        userId: req.user?._id,
      });
      if (shareLink) {
        res.json({
          hash: shareLink.hash,
        });
        return;
      }
      const hash = generateHash(10);
      await Link.create({
        userId: req.user?._id,
        hash: hash,
      });
      res.json({
        message: "/share/" + hash,
      });
    } else {
      await Link.deleteOne({
        userId: req.user?._id,
      });
      res.json({
        message: "removed link",
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
};

export const getShareContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const hash = req.params?.shareLink;
    if (!hash) {
      res.status(400).json({
        message: "share link is required",
      });
    }
    // search for link in the db
    const link = await Link.findOne({
      hash,
    });
    if (!link) {
      res.status(411).json({
        message: "invalid or expired sharelink",
      });
    }
    const userId = link?.userId;
    //give us the content according to the link
    const content = await Content.find({
      userId,
    });
    // give us the user info
    const user = await User.findOne({
      userId,
    });
    if (!user) {
      res.status(411).json({
        message: "user not found,error should ideally not happen",
      });
      return;
    }
    res.status(200).json({
      username: user?.username,
      content,
    });
  } catch (error) {
    console.error("Error in getShareContent:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
