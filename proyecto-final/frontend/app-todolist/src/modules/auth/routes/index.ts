import LoginForm from "../components/LoginForm.vue";
import UserForm from "../../user/components/UserForm.vue";
import ForgotPasswordForm from "../components/ForgotPasswordForm.vue";
import ResetPasswordForm from "../components/ResetPasswordForm.vue";

export const authRoutes = [
  { name: "login", path: "/login", component: LoginForm },
  { name: "register", path: "/register", component: UserForm },
  { name: "forgot", path: "/forgot", component: ForgotPasswordForm },
  { name: "reset", path: "/reset/:token", component: ResetPasswordForm },
];
