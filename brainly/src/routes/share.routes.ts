import { getShareContent, shareContent } from "../controllers/share.controller";
import express, { Router } from "express";
import { userMiddleware } from "../middlewares/userAuth.middleware";
const router = express.Router();

router.post("/brain/share", userMiddleware, shareContent);
router.get("/brain/:shareLink", userMiddleware, getShareContent);
export default router;
