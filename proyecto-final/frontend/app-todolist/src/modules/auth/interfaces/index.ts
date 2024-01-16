export interface ActionSignIn {
  username: string | null;
  password: string | null;
}

export interface ActionSignOut {
  userId: string | null;
}

export interface User {
  _id: string;
  fullname: string | null;
  access_token: string | null;
  expires_at: string | null;
  status: string | null;
}