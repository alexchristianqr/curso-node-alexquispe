import express from "express";
const router = express.Router();
import { userController } from "./user.controller.js";
import { validateBearerToken } from "../core/middlewares/authenticate.middleware.js";

router.get("/users", validateBearerToken, userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);

export { router as userRoute };
