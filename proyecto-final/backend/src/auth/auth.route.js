import express from "express";
const router = express.Router();
import { authController } from "./auth.controller.js";
import { validateBearerToken } from "../core/middlewares/authenticate.middleware.js";

router.post("/auth/register", authController.signUp);
router.post("/auth/login", authController.signIn);
router.post("/auth/logout", validateBearerToken, authController.signOut);
router.post("/auth/forgot", authController.forgotPassword);
router.post("/auth/reset", authController.resetPassword);

export { router as authRoute };
