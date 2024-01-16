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
  async getTodoById(req, res) {
    try {
      const { id } = req.params;
      const result = await todoService.getById(id);
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
  async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await todoService.update(id, data);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async updateFieldTodo(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await todoService.updateField(id, data);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const result = await todoService.remove(id);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
}

export const todoController = new TodoController();
