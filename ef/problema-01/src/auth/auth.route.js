import express from "express";
const router = express.Router();
import { authController } from "./auth.controller.js";

router.post("/auth/login", authController.login);
router.post("/auth/forgot", authController.login);
router.post("/auth/reset", authController.login);

export { router as authRoute };
