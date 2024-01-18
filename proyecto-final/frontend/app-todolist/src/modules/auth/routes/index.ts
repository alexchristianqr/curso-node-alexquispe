import LoginForm from "../components/LoginForm.vue";
import UserForm from "../../user/components/UserForm.vue";
import ForgotPasswordForm from "../components/ForgotPasswordForm.vue";

export const authRoutes = [
  { name: "login", path: "/login", component: LoginForm },
  { name: "register", path: "/register", component: UserForm },
  { name: "forgot", path: "/forgot", component: ForgotPasswordForm },
];
