class TodoService {
  async getAll() {
    return ["alex", "Glenda"];
  }
  async create(data) {
    const { payload } = data;
    return payload;
  }
}

export const todoService = new TodoService();
