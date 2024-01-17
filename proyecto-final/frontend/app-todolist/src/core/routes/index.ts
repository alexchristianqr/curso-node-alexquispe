import { createRouter, createWebHistory } from "vue-router";
import { authRoutes } from "../../modules/auth/routes";
import { todoRoutes } from "../../modules/todo/routes";
// import { useAuthStore } from "../../modules/auth/store";

const routes = [{ path: "/", redirect: { name: "login" } }, ...authRoutes, ...todoRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(async (guard) => {
//   console.log({ guard });
//   // if (to.meta.requiresAuth && !loggedIn) return "/login";
//   // const { loggedIn } = useAuthStore();
//   // if (!loggedIn) guard.to.fullPatho;
// });

export { router };
