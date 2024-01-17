import { compareHashedPassword, signJwtToken } from "../core/utils/index.js";
import { httpStatusCodes } from "../core/enums/index.js";
import { userService } from "../user/user.service.js";
import { mailService } from "../core/services/index.js";
import { checkInputPasswords } from "./auth.util.js";

class AuthService {
  async signUp(payload) {
    if (!checkInputPasswords(payload)) throw { message: "Las contraseñas ingresadas no son iguales", status: httpStatusCodes.BAD_REQUEST };

    const user = await userService.create(payload);

    // Enviar email
    await mailService.sendMailSingle({ subject: "Nuevo registro", to: payload.username, message: "Muchas gracias por registrarte al sistema." });

    return user;
  }
  async signIn(payload) {
    const { username, password } = payload;

    // Obtener usuario
    const user = await userService.getByQuery({ query: { username: username } });
    if (!user) {
      throw {
        message: "El email o contraseña son incorrectos",
        status: httpStatusCodes.UNAUTHORIZED,
      };
    }

    // Set
    const userId = user._id;

    // Validar contraseña cifrada
    const equals = compareHashedPassword(password, user.password);
    if (!equals) {
      throw {
        message: "El email o contraseña son incorrectos",
        status: httpStatusCodes.UNAUTHORIZED,
      };
    }

    const { access_token, expires_at } = await signJwtToken({ user });

    // Actualizar access token y refresh token de usuario autenticado
    await userService.updateById(userId, {
      access_token: access_token,
      expires_at: new Date(expires_at),
      refresh_at: new Date(),
      revoked: false,
    });

    // Enviar email
    await mailService.sendMailSingle({ subject: "Alerta de seguridad", to: username, message: "Has iniciado sesión recientemente." });

    const userAuthenticate = {
      _id: userId,
      fullname: user.fullname,
      status: user.status,
      access_token: access_token,
      expires_at: expires_at,
    };
    return {
      user: userAuthenticate,
    };
  }
  async signOut(payload) {
    const { userId = null } = payload;

    // Buscar usuario
    const user = await userService.getById(userId);
    if (!user) throw { message: "user not found", status: httpStatusCodes.FORBIDDEN };

    // Actualizar usuario
    await userService.updateById(userId, {
      access_token: null,
      expires_at: null,
      refresh_at: new Date(),
      revoked: true,
    });

    return true;
  }
  async forgotPassword() {}
  async resetPassword() {}
}

export const authService = new AuthService();
