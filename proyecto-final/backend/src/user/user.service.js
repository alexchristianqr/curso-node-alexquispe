import { User } from "./user.schema.js";
import { signJwtToken, hashedPassword } from "../core/utils/index.js";

class UserService {
  async getAll() {
    return User.find();
  }
  async getById(id) {
    return User.findOne({ _id: id });
  }
  async getByQuery(payload) {
    const { query } = payload;
    return User.findOne(query);
  }
  async create(payload) {
    payload.password = hashedPassword(payload.password);
    payload.revoked = false;

    const { access_token, expires_at } = await signJwtToken({ user: payload });
    payload.access_token = access_token;
    payload.expires_at = expires_at;

    return User.create(payload);
  }
  async updateById(id, payload) {
    return User.updateOne({ _id: id }, payload);
  }
  async updateByQuery(payload) {
    const { query, data } = payload;
    return User.updateOne(query, data);
  }
}

export const userService = new UserService();
