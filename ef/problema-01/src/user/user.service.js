import { User } from "./user.schema.js";

class UserService {
  async getAll() {
    return User.find();
  }
  async create(data) {
    const { payload } = data;
    payload.created_at = new Date();
    payload.revoked = false;
    payload.access_token = null;
    return User.create(payload);
  }
}

export const userService = new UserService();
