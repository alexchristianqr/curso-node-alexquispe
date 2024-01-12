import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
  description: { type: String, required: true },
  status: { type: String, required: true, enum: ["complete", "in_progress", "todo"] },
  created_at: { type: Date, default: Date.now() },
});

export const Todo = mongoose.model("todolist", TodoSchema);
