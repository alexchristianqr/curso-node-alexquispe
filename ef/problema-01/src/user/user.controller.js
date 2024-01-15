import { errorHandler, responseHandler } from "../core/utils/index.js";

class UserController {
  async getUsers(req, res) {
    try {
      const result = null;
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async createUser(req, res) {
    try {
      const result = null;
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
}

export const userController = new UserController();
