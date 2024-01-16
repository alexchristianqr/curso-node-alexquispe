import { defineStore } from "pinia";
import { Todo } from "../../todo/interfaces";
import { authService } from "../services/auth.service";
import { qalertNotify } from "../../../core/utils";
import { User } from "../interfaces";
import { httpAdapterService } from "../../../core/services";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    auth: {
      user: {} as User,
      accessToken: null,
      loggedIn: false,
    },
  }),
  getters: {
    userAuthenticate: (state) => state.auth.user,
    accessToken: (state) => state.auth.accessToken,
    loggedIn: (state) => state.auth.loggedIn,
  },
  actions: {
    async login(payload: Todo) {
      const { result } = await authService.signIn(payload);
      this.auth.user = result.user;
      this.auth.accessToken = result.user.access_token;
      this.auth.loggedIn = true;

      httpAdapterService.addHeaderAuthorization(result.user.access_token);

      qalertNotify({
        message: "Usted ha iniciado sesión con éxito",
      });
    },
  },
});
