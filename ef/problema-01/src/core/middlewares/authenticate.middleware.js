import { User } from "../../user/user.schema.js";
import { errorHandler } from "../utils/index.js";
import { httpStatusCodes } from "../enums/index.js";

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
    const queryOauthAccessToken = {
      access_token: accessToken,
    };
    if (!envDevelopment) {
      queryOauthAccessToken.revoked = false;
    }

    // Encontrar token de acceso
    const oauthAccessToken = await User.findOne(queryOauthAccessToken);
    if (!oauthAccessToken) return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: "access unauthorized" });

    const userId = oauthAccessToken._id;

    // Validar fecha de expiración de token de acceso / No validará si está en modo desarrollo
    const validateExpAccessToken = oauthAccessToken.expires_at >= new Date();
    if (!validateExpAccessToken && !envDevelopment) {
      // Set user updated
      const userUpdated = {
        access_token: null, // Token de acceso
        refresh_token: null, // Token de actualización
        expires_at: null, // Fecha de expiración
        revoked: true, // Token revocado
        refresh_at: new Date(), // Fecha token actualizado
      };
      await User.updateOne({ _id: userId }, userUpdated);
      return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: "access unauthorized" });
    }

    // Buscar usuario autenticado
    const user = await User.findOne({
      _id: userId, // ObjectId()
      status: "active",
    });

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
