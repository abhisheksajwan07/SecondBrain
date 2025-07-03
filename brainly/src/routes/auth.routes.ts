import express,{ Router } from "express";
import { signInUser, signupUser } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin",signInUser)

export default router;
