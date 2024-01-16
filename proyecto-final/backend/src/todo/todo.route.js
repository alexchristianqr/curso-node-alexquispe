import express from "express";
const router = express.Router();
import { todoController } from "./todo.controller.js";
import { validateBearerToken } from "../core/middlewares/authenticate.middleware.js";

router.get("/todo", validateBearerToken, todoController.getTodos);
router.get("/todo/:id", validateBearerToken, todoController.getTodoById);
router.post("/todo", validateBearerToken, todoController.createTodo);
router.put("/todo/:id", validateBearerToken, todoController.updateTodo);
router.patch("/todo/:id", validateBearerToken, todoController.updateFieldTodo);
router.delete("/todo/:id", validateBearerToken, todoController.deleteTodo);

export { router as todoRoute };
