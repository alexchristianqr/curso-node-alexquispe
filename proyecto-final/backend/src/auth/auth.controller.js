import { errorHandler, responseHandler } from "../core/utils/index.js";
import { authService } from "./auth.service.js";

class AuthController {
  async signUp(req, res) {
    try {
      const data = req.body;
      const result = await authService.signUp(data);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async signIn(req, res) {
    try {
      const data = req.body;
      const result = await authService.signIn(data);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async signOut(req, res) {
    try {
      const data = req.body;
      const result = await authService.signOut(data);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async forgotPassword(req, res) {
    try {
      const data = req.body;
      const result = await authService.forgotPassword(data);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async resetPassword(req, res) {
    try {
      const data = req.body;
      const result = await authService.resetPassword(data);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
}

export const authController = new AuthController();
