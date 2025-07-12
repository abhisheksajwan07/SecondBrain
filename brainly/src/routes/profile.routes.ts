import express, { Router } from "express";
import { userMiddleware } from "../middlewares/userAuth.middleware";
import { getProfile } from "../controllers/profile.controller";

const router = express.Router();

router.get("/profile", userMiddleware, getProfile);

export default router;
