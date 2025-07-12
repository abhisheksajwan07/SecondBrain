import express, { Router } from "express";
import { logoutUser, signInUser, signupUser } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signInUser);
router.post("/logout",logoutUser)

export default router;
