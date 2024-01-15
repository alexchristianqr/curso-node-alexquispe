import express from "express";
const router = express.Router();
import { userController } from "./user.controller.js";

router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);

export { router as authRoute };
