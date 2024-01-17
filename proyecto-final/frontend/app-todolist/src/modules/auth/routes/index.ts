import LoginForm from "../components/LoginForm.vue";
import UserForm from "../../user/components/UserForm.vue";

export const authRoutes = [
  { name: "login", path: "/login", component: LoginForm },
  { name: "register", path: "/register", component: UserForm },
];
