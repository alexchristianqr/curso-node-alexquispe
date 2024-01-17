import { createRouter, createWebHistory } from "vue-router";
import { authRoutes } from "../../modules/auth/routes";
import { todoRoutes } from "../../modules/todo/routes";

export const router = createRouter({
  history: createWebHistory(),
  routes: [...authRoutes, ...todoRoutes],
});
