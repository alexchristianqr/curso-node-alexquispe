import { User } from "./user.schema.js";
import { signJwtToken } from "../core/utils/index.js";

class UserService {
  async getAll() {
    return User.find();
  }
  async create(data) {
    const { payload } = data;
    payload.created_at = new Date();
    payload.revoked = false;
    const user = payload;

    const { access_token, expires_at } = await signJwtToken({ user });
    payload.access_token = access_token;
    payload.expires_at = expires_at;

    return User.create(payload);
  }
}

export const userService = new UserService();
