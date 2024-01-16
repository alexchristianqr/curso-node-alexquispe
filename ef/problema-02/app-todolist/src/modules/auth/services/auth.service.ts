import { httpAdapterService } from "../../../core/services";
import { ActionSignIn, ActionSignOut } from "../interfaces";

class AuthService {
  async signIn(payload: any) {
    try {
      const data: ActionSignIn = { payload };
      const response = await httpAdapterService.post("/auth/login", data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async signOut(payload: any) {
    try {
      const data: ActionSignOut = { payload };
      await httpAdapterService.post("/auth/logout", data);
      return;
    } catch (error) {
      return error;
    }
  }
}

export const authService = new AuthService();
