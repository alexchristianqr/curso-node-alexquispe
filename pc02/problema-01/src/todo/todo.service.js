import { Todo } from "./todo.schema.js";

class TodoService {
  async getAll() {
    return Todo.find();
  }
  async create(data) {
    const { payload } = data;
    const result = await Todo.create(payload);
    return result;
  }
  async update(id, data) {
    const { payload } = data;
    const result = await Todo.updateOne({ _id: id }, payload);
    return result;
  }
}

export const todoService = new TodoService();
