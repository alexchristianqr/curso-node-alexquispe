import { defineStore } from "pinia";
import { authService } from "../services/auth.service.ts";
import { qalertNotify } from "../../../core/utils";
import { ActionForgotPassword, ActionResetPassword, ActionSignIn, ActionSignOut, ActionSignUp } from "../interfaces";
import { router } from "../../../core/routes";
import { httpAdapterService } from "../../../core/services";
import { User } from "../../user/interfaces";

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
    async signIn(payload: ActionSignIn) {
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

      await router.replace({ name: "home" });

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
        const { error } = await authService.signOut(payload);
        if (error) {
          qalertNotify({ color: "red", message: error });
          return { success: false };
        }
      }

      this.auth.user = { _id: "", fullname: "", access_token: "", expires_at: "", status: "" };
      this.auth.accessToken = null;
      this.auth.loggedIn = false;

      await httpAdapterService.removeHeaders();

      qalertNotify({
        message: "Ha cerrado su sesión con éxito",
      });

      await router.replace({ name: "login" });

      return { success: true };
    },
    async forgotPassword(payload: ActionForgotPassword) {
      const { error, result } = await authService.forgotPassword(payload);
      if (error) {
        return { success: false };
      }

      await router.replace({ name: "reset", params: { token: result.token } });

      qalertNotify({
        message: "Hemos enviado un correo electronico para la recuperación de su contraseña",
      });

      return { success: true };
    },
    async resetPassword(payload: ActionResetPassword) {
      const { error } = await authService.resetPassword(payload);
      if (error) {
        qalertNotify({ color: "red", message: error });
        return { success: false };
      }

      await router.replace({ name: "login" });

      qalertNotify({
        message: "Su contraseña se ha actualizado con éxito",
      });

      return { success: true };
    },
  },
});
