import { defineStore } from "pinia";
import { authService } from "../services/auth.service.ts";
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
    async signIn(payload: any) {
      const { result } = await authService.signIn(payload);
      this.auth.user = result.user;
      this.auth.accessToken = result.user.access_token;
      this.auth.loggedIn = true;

      httpAdapterService.addHeaderAuthorization(result.user.access_token);

      qalertNotify({
        message: "Usted ha iniciado sesión con éxito",
      });
    },
    async signOut() {
      if (this.auth.user._id) {
        const payload = {
          userId: this.auth.user._id,
        };
        await authService.signOut(payload);
      }
      this.auth.user = { _id: "", fullname: null, access_token: null, expires_at: null };
      this.auth.accessToken = null;
      this.auth.loggedIn = false;

      await httpAdapterService.removeHeaders();

      qalertNotify({
        color: "red",
        message: "Ha cerrado su sesión con éxito",
      });
    },
  },
});
