import express from "express";
const router = express.Router();
import { userController } from "./user.controller.js";
import { validateBearerToken } from "../core/middlewares/authenticate.middleware.js";

router.get("/users", validateBearerToken, userController.getUsers);
router.get("/users/:id", validateBearerToken, userController.getUserById);
router.post("/users", validateBearerToken, userController.createUser);

export { router as userRoute };
