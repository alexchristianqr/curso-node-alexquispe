import { defineStore } from "pinia";
import { authService } from "../services/auth.service.ts";
import { qalertNotify } from "../../../core/utils";
import { ActionSignIn, ActionSignOut, ActionSignUp, User } from "../interfaces";
import { router } from "../../../core/routes";
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
    async signUp(payload: ActionSignUp) {
      const { error } = await authService.signUp(payload);
      if (error) {
        return { success: false };
      }

      await router.replace({ name: "login" });

      qalertNotify({
        message: "Usted se ha registrado con éxito. Inicie sesión con sus credenciales",
      });

      return { success: true };
    },
    async signIn(payload: ActionSignIn): Promise<any> {
      const { result, error } = await authService.signIn(payload);
      if (error) {
        qalertNotify({
          color: "red",
          message: error,
        });
        return { success: false };
      }

      this.auth.user = result.user;
      this.auth.accessToken = result.user.access_token;
      this.auth.loggedIn = true;

      httpAdapterService.addHeaderAuthorization(result.user.access_token);

      qalertNotify({
        message: "Usted ha iniciado sesión con éxito",
      });

      return { success: true };
    },
    async signOut() {
      if (this.auth.user._id) {
        const payload: ActionSignOut = {
          userId: this.auth.user._id,
        };
        await authService.signOut(payload);
      }
      this.auth.user = { _id: "", fullname: null, access_token: null, expires_at: null, status: null };
      this.auth.accessToken = null;
      this.auth.loggedIn = false;

      await httpAdapterService.removeHeaders();

      qalertNotify({
        color: "red",
        message: "Ha cerrado su sesión con éxito",
      });

      return { success: true };
    },
  },
});
