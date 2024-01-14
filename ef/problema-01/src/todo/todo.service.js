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
    payload.created_at = new Date();
    return Todo.create(payload);
  }
  async update(id, data) {
    const { payload = {} } = data;
    payload.updated_at = new Date();
    await Todo.updateOne({ _id: id }, payload);
    return this.getById(id);
  }
  async updateField(id, data) {
    const { payload } = data;
    await Todo.updateOne({ _id: id }, payload);
    return this.getById(id);
  }
  async remove(id) {
    return Todo.deleteOne({ _id: id });
  }
}

export const todoService = new TodoService();
