import { compareHashedPassword, signJwtToken } from "../core/utils/index.js";
import { httpStatusCodes } from "../core/enums/index.js";
import { userService } from "../user/user.service.js";

class AuthService {
  async signUp(data) {
    const user = await userService.create(data);
    return user;
  }
  async signIn(data) {
    const { payload } = data;
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
      payload: {
        access_token: access_token,
        expires_at: new Date(expires_at),
        refresh_at: new Date(),
        revoked: false,
      },
    });

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
  async signOut(data) {
    const { payload } = data;
    let userId;

    // Buscar usuario
    userId = payload.userId;
    const user = await userService.getById(userId);
    if (!user) throw { message: "user not found", status: httpStatusCodes.FORBIDDEN };

    // Actualizar usuario
    await userService.updateById(userId, {
      payload: {
        access_token: null,
        expires_at: null,
        refresh_at: new Date(),
        revoked: true,
      },
    });
  }
}

export const authService = new AuthService();
