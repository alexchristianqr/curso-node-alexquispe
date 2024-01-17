import { Todo } from "./todo.schema.js";

class TodoService {
  async getAll() {
    return Todo.find();
  }
  async getById(id) {
    return Todo.findOne({ _id: id });
  }
  async create(payload) {
    payload.created_at = new Date();
    return Todo.create(payload);
  }
  async update(id, payload) {
    payload.updated_at = new Date();
    await Todo.updateOne({ _id: id }, payload);
    return this.getById(id);
  }
  async updateField(id, payload) {
    await Todo.updateOne({ _id: id }, payload);
    return this.getById(id);
  }
  async remove(id) {
    return Todo.deleteOne({ _id: id });
  }
}

export const todoService = new TodoService();
