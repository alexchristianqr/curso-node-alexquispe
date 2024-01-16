import { Todo } from "../../todo/interfaces";
import { httpAdapterService } from "../../../core/services";

class AuthService {
  async signIn(payload: Todo) {
    try {
      const data = {
        payload,
      };
      const response = await httpAdapterService.post("/auth/login", data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export const authService = new AuthService();
