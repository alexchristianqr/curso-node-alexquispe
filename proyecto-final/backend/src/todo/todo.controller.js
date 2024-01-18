import { todoService } from "./todo.service.js";
import { responseHandler, errorHandler } from "../core/utils/index.js";

class TodoController {
  async getTodos(req, res) {
    try {
      const payload = {};
      payload.user = req.userAuthenticate;
      const result = await todoService.getAll(payload);
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
      const { payload } = req.body;
      const result = await todoService.create(payload);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const { payload } = req.body;
      const result = await todoService.update(id, payload);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async updateFieldTodo(req, res) {
    try {
      const { id } = req.params;
      const { payload } = req.body;
      const result = await todoService.updateField(id, payload);
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
