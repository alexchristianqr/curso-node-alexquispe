import { httpAdapterService } from "../../../core/services";
import { ActionSignIn, ActionSignOut } from "../interfaces";

class AuthService {
  async signIn(payload: ActionSignIn) {
    try {
      const data = { payload };
      const response = await httpAdapterService.post("/auth/login", data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async signOut(payload: ActionSignOut) {
    try {
      const data = { payload };
      await httpAdapterService.post("/auth/logout", data);
      return;
    } catch (error) {
      return error;
    }
  }
}

export const authService = new AuthService();
