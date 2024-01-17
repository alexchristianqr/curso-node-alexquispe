import { errorHandler, responseHandler } from "../core/utils/index.js";
import { userService } from "./user.service.js";

class UserController {
  async getUsers(req, res) {
    try {
      const result = await userService.getAll();
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const result = await userService.getById(id);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
  async createUser(req, res) {
    try {
      const { payload } = req.body;
      const result = await userService.create(payload);
      return responseHandler({ req, res }, result);
    } catch (error) {
      return errorHandler({ req, res, error });
    }
  }
}

export const userController = new UserController();
