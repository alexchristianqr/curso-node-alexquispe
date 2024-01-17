import { errorHandler } from "../utils/index.js";
import { httpStatusCodes } from "../enums/index.js";
import { userService } from "../../user/user.service.js";

export async function validateBearerToken(req, res, next) {
  try {
    // Set
    const envDevelopment = process.env.NODE_ENV === "development";

    // Set header
    const headerAuth = req.header("Authorization");
    if (!headerAuth) return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: "header authorization not exists" });
    const accessToken = headerAuth.replace("Bearer ", "");
    if (!accessToken) return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: "access unauthorized" });

    // Set query
    const queryUserOauth = {
      access_token: accessToken,
    };
    if (!envDevelopment) {
      queryUserOauth.revoked = false;
    }

    // Encontrar token de acceso
    const userOauth = await userService.getByQuery({ query: queryUserOauth });
    if (!userOauth) return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: "access unauthorized" });

    const userId = userOauth._id;
    const validateExpAccessToken = userOauth.expires_at >= new Date();

    // Validar fecha de expiración de token de acceso / No validará si está en modo desarrollo
    if (!validateExpAccessToken && !envDevelopment) {
      const userUpdated = {
        access_token: null, // Token de acceso
        refresh_token: null, // Token de actualización
        expires_at: null, // Fecha de expiración
        revoked: true, // Token revocado
        refresh_at: new Date(), // Fecha token actualizado
      };
      await userService.updateById(userId, userUpdated);
      return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: "access unauthorized" });
    }

    // Buscar usuario autenticado
    const queryUser = {
      _id: userId, // ObjectId()
      status: "active",
    };
    const user = await userService.getByQuery({ query: queryUser });

    // Validar usuario
    if (!user) {
      return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: "access unauthorized" });
    }

    // Set
    req.user = user;

    // Response
    return next();
  } catch (error) {
    return errorHandler({ req, res, error });
  }
}
