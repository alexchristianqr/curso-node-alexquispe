import { compareHashedPassword, hashedPassword, signJwtToken } from "../core/utils/index.js";
import { httpStatusCodes } from "../core/enums/index.js";
import { userService } from "../user/user.service.js";
import { mailService } from "../core/services/index.js";
import { checkInputPasswords } from "./auth.util.js";
import CryptoJS from "crypto-js";

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
      reset_password_token: null,
      reset_expires_at: null,
      updated_at: new Date(),
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
      reset_password_token: null,
      reset_expires_at: null,
      updated_at: new Date(),
    });

    return true;
  }
  async forgotPassword(payload) {
    const user = await userService.getByQuery({ query: { username: payload.username } });
    if (!user) throw { message: "No se puede recuperar su contraseña", status: httpStatusCodes.BAD_REQUEST };

    const hash = CryptoJS.SHA256(process.env.APP_SECRET);
    const token = hash.toString(CryptoJS.enc.Hex);

    user.reset_password_token = token;
    user.reset_expires_at = Date.now() + 36000000;
    user.updated_at = new Date();

    await user.save();

    // Enviar email
    await mailService.sendMailSingle({
      subject: "Recuperación de contraseña",
      to: payload.username,
      message: `Ingresa al siguiente enlace para recuperar tu contraseña http://localhost:5173/reset/${token}`,
    });

    return { token };
  }
  async resetPassword(token, payload) {
    if (!checkInputPasswords(payload)) throw { message: "Las contraseñas ingresadas no son iguales", status: httpStatusCodes.BAD_REQUEST };

    const user = await userService.getByQuery({ query: { reset_password_token: token, reset_expires_at: { $gt: Date.now() } } });
    if (!user) throw { message: "No se puede cambiar su contraseña", status: httpStatusCodes.BAD_REQUEST };

    user.password = hashedPassword(payload.password);
    user.reset_password_token = null;
    user.reset_expires_at = null;
    user.updated_at = new Date();

    await user.save();

    return true;
  }
}

export const authService = new AuthService();
