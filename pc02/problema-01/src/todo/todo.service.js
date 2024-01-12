import { Todo } from "./todo.schema.js";

class TodoService {
  async getAll() {
    return Todo.find();
  }
  async getById(id) {
    return Todo.findOne({ _id: id });
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
  async remove(id) {
    const result = await Todo.deleteOne({ _id: id });
    return result;
  }
}

export const todoService = new TodoService();
