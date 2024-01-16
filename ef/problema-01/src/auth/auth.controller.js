import { errorHandler, responseHandler } from "../core/utils/index.js";
import { authService } from "./auth.service.js";

class AuthController {
  async login(req, res) {
    try {
      const data = req.body;
      const result = await authService.signIn(data);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async logout(req, res) {
    try {
      const data = req.body;
      const result = await authService.signOut(data);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
}

export const authController = new AuthController();
