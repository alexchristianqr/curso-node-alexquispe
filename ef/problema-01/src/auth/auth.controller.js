import { errorHandler, responseHandler } from "../core/utils/index.js";

class AuthController {
  async login(req, res) {
    try {
      const result = null;
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
}

export const authController = new AuthController();
