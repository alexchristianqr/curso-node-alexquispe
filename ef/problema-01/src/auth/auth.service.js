import { User } from "../user/user.schema.js";
import { compareHashedPassword, signJwtToken } from "../core/utils/index.js";
import { httpStatusCodes } from "../core/enums/index.js";

class AuthService {
  async signIn(data) {
    const { payload } = data;
    const { username, password } = payload;
    const user = await User.findOne({ username: username });

    // Validar usuario
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
    await User.updateOne(
      {
        _id: userId,
      },
      {
        access_token: access_token,
        expires_at: new Date(expires_at),
        refresh_at: new Date(),
        revoked: false,
      },
    );

    const userAuthenticate = {
      fullname: user.fullname,
      status: user.status,
      access_token: access_token,
      expires_at: expires_at,
    };

    return {
      user: userAuthenticate,
    };
  }
}

export const authService = new AuthService();
