import express from "express";
const router = express.Router();
import { authController } from "./auth.controller.js";
import { validateBearerToken } from "../core/middlewares/authenticate.middleware.js";

router.post("/auth/login", authController.login);
router.post("/auth/logout", validateBearerToken, authController.logout);
router.post("/auth/forgot", authController.login);
router.post("/auth/reset", authController.login);

export { router as authRoute };
