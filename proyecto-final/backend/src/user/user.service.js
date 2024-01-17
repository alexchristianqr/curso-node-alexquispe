import { User } from "./user.schema.js";
import { signJwtToken, hashedPassword } from "../core/utils/index.js";

class UserService {
  async getAll() {
    return User.find();
  }
  async getById(id) {
    return User.findOne({ _id: id });
  }
  async getByQuery(data) {
    const { query } = data;
    return User.findOne(query);
  }
  async create(data) {
    const { payload } = data;

    payload.password = hashedPassword(payload.password);
    payload.revoked = false;
    const user = payload;

    const { access_token, expires_at } = await signJwtToken({ user });
    payload.access_token = access_token;
    payload.expires_at = expires_at;

    return User.create(payload);
  }
  async updateById(id, data) {
    const { payload } = data;
    return User.updateOne({ _id: id }, payload);
  }
  async updateQuery(data) {
    const { query, payload } = data;
    return User.updateOne(query, payload);
  }
}

export const userService = new UserService();
