import { todoService } from "./todo.service.js";
import { responseHandler, errorHandler } from "../core/utils/index.js";

class TodoController {
  async getTodos(req, res) {
    try {
      const result = await todoService.getAll();
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }

  async createTodo(req, res) {
    try {
      const data = req.body;
      const result = await todoService.create(data);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
}

export const todoController = new TodoController();
