type StatusTodo = "complete" | "in_progress" | "todo";

export interface Todo {
  _id?: string | null;
  description?: string | null;
  status?: StatusTodo | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}

type ActionsForm = "edit" | "register" | "remove";
export interface ConfigForm {
  action: ActionsForm;
}
