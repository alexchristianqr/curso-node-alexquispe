type StatusTodo = "complete" | "in_progress" | "todo";

export interface Todo {
  _id?: string;
  description?: string;
  status?: StatusTodo;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

type ActionsForm = "edit" | "register" | "remove";
export interface ConfigForm {
  action: ActionsForm;
}
