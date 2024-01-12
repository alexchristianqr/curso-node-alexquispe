import express from "express";
const router = express.Router();
import { todoController } from "./todo.controller.js";

router.get("/todo", todoController.getTodos);
router.get("/todo/:id", todoController.getTodoById);
router.post("/todo", todoController.createTodo);
router.put("/todo/:id", todoController.updateTodo);
router.delete("/todo/:id", todoController.deleteTodo);

export { router as todoRoute };
