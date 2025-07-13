import { Request, Response } from "express";
export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // console.log("➡️  Hit /profile route"); 
    
    
    const user = req.user;
    // console.log("🔐 User from middleware:", user); 
    if (!user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    res.json({
      id: user._id,
      emailId: user.emailId,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
