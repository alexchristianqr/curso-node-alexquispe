type StatusTodo = "complete" | "in_progress" | "todo";

export interface Todo {
  description?: string;
  status?: StatusTodo;
  created_at?: Date;
}

type ActionsForm = "edit" | "register";
export interface ConfigForm {
  action: ActionsForm;
}
