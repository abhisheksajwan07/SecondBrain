import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Content } from "../models/content.model";
import { userMiddleware } from "../middlewares/userAuth.middleware";

export const createContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("body:", req.body);
    const { title, link, type } = req.body;
    const userId = req.user?._id;
    const newContent = await Content.create({
      link,
      title,
      type,
      userId,
      tag: [],
    });
    res.json({
      message: "Content created successfully",
      content: newContent,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
  //   {
  //   "message": "Content added successfully",
  //   "content": {
  //     "_id": "665ff9a4abc123",
  //     "title": "Best JS Crash Course",
  //     "link": "https://youtube.com",
  //     "type": "video",
  //     "tags": [],
  //     "userId": "665fe2...",
  //     "createdAt": "2024-07-01T14:05:22.123Z",
  //     "updatedAt": "2024-07-01T14:05:22.123Z",
  //     "__v": 0
  //   }
  // }
};

export const getContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id;
    const content = await Content.find({ userId }).populate(
      "userId",
      "username emailId"
    );
    console.log(content);
    res.json({ content });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    }
  }
};
export const deleteContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const contentId = req.params.id;
  const userId = req.user?._id;

  try {
    const deleteContent = await Content.findOneAndDelete({
      _id: contentId,
      userId: userId,
    });

    if (!deleteContent) {
      res.status(403).json({ message: "Not allowed or content not found" });
      return;
    }

    res.json({
      message: "Content deleted successfully",
      deletedContent: deleteContent,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
