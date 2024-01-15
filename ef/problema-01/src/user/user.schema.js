import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  access_token: { type: String, default: null },
  revoked: { type: String, default: true },
  expires_at: { type: Date, default: null },
  created_at: { type: Date, default: Date.now(), required: true },
  updated_at: { type: Date },
});

export const User = mongoose.model("user", UserSchema);
