import { errorHandler, responseHandler } from "../core/utils/index.js";
import { authService } from "./auth.service.js";

class AuthController {
  async signUp(req, res) {
    try {
      const { payload } = req.body;
      const result = await authService.signUp(payload);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async signIn(req, res) {
    try {
      const { payload } = req.body;
      const result = await authService.signIn(payload);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async signOut(req, res) {
    try {
      const { payload } = req.body;
      const result = await authService.signOut(payload);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async forgotPassword(req, res) {
    try {
      const { payload } = req.body;
      const result = await authService.forgotPassword(payload);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async resetPassword(req, res) {
    try {
      const { token } = req.params;
      const { payload } = req.body;
      const result = await authService.resetPassword(token, payload);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
}

export const authController = new AuthController();
