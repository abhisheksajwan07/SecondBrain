import express, { Router } from "express";
import {
  createContent,
  deleteContent,
  getContent,
} from "../controllers/content.controller";
import { userMiddleware } from "../middlewares/userAuth.middleware";

const router = express.Router();

router.post("/content", userMiddleware, createContent);
router.get("/getContent", userMiddleware, getContent);
router.delete("/content/:id", userMiddleware, deleteContent);

export default router;
