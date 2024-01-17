export interface User {
  _id: string;
  fullname: string | null;
  access_token: string | null;
  expires_at: string | null;
  status: string | null;
}

export interface ActionUserForm {
  _id?: string;
  fullname: string | null;
  username: string | null;
  password: string | null;
  repeat_password: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}
