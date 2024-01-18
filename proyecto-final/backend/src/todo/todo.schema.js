import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
  description: { type: String, required: true },
  user_id: { type: String, required: true },
  status: { type: String, required: true, enum: ["complete", "in_progress", "todo"] },
  created_at: { type: Date, default: Date.now(), required: true },
  updated_at: { type: Date },
});

export const Todo = mongoose.model("todolist", TodoSchema);
