import { httpAdapterService } from "../../../core/services";
import { ActionForgotPassword, ActionSignIn, ActionSignOut, ActionSignUp } from "../interfaces";

class AuthService {
  async signUp(payload: ActionSignUp) {
    try {
      const data = { payload };
      const response = await httpAdapterService.post("/auth/register", data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async forgotPassword(payload: ActionForgotPassword) {
    try {
      const data = { payload };
      const response = await httpAdapterService.post("/auth/forgot", data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
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
      const response = await httpAdapterService.post("/auth/logout", data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export const authService = new AuthService();
