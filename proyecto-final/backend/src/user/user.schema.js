import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },

  // Token de acceso
  access_token: { type: String, default: null },
  expires_at: { type: Date, default: null },
  refresh_token: { type: String, default: null },
  revoked: { type: Boolean, default: true },

  // Token de reseteo
  reset_password_token: { type: String, default: null },
  reset_expires_at: { type: Date, default: null },

  status: { type: String, enum: ["active", "inactive", "deleted"], default: "active" },
  refresh_at: { type: Date, default: null },
  created_at: { type: Date, default: Date.now(), required: true },
  updated_at: { type: Date, default: null },
});

export const User = mongoose.model("user", UserSchema);
