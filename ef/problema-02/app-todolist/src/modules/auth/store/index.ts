import { defineStore } from "pinia";
import { Todo } from "../../todo/interfaces";
import { authService } from "../services/auth.service";
import { qalertNotify } from "../../../core/utils";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    auth: {
      loggedIn: false,
      accessToken: null,
    },
  }),
  getters: {
    accessToken: (state) => state.auth.accessToken,
    loggedIn: (state) => state.auth.loggedIn,
  },
  actions: {
    async login(payload: Todo) {
      const { result } = await authService.signIn(payload);
      this.auth.loggedIn = true;
      this.auth.accessToken = result.access_token;

      qalertNotify({
        message: "Usted ha iniciado sesión con éxito",
      });
    },
  },
});
