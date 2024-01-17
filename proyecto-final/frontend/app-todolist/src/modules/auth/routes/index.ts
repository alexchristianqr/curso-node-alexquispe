import LoginForm from "../components/LoginForm.vue";
import UserForm from "../../user/components/UserForm.vue";

export const authRoutes = [
  { path: "/", redirect: "/login" },
  { name: "login", path: "/login", component: LoginForm },
  { name: "register", path: "/register", component: UserForm },
];
