class TodoService {
  async getAll() {
    return ["alex", "Glenda"];
  }
}

export const todoService = new TodoService();
