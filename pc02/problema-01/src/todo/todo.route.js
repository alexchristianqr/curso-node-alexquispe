import express from "express";
const router = express.Router();
import { todoController } from "./todo.controller.js";

router.get("/todo", todoController.getTodos);

export { router as todoRoute };
