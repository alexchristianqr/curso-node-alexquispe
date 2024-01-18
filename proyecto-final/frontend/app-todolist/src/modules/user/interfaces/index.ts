export interface User {
  _id: string;
  fullname: string;
  access_token: string;
  expires_at: string;
  status: string;
}

export interface ActionUserForm {
  _id?: string;
  fullname: string;
  username: string;
  password: string;
  repeat_password: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}
