import express from "express";
const router = express.Router();
import { todoController } from "./todo.controller.js";

router.get("/todo", todoController.getTodos);
router.post("/todo", todoController.createTodo);

export { router as todoRoute };
