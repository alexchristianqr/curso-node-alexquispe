import { httpAdapterService } from "../../../core/services";

export class TodoService {
  static async getTodos() {
    try {
      return await httpAdapterService.get("/todo");
    } catch (error) {
      return error;
    }
  }
}
