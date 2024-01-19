import jwt from "jsonwebtoken";

export async function signJwtToken({ user = {}, timeExpiresAt = 8, oauthAccessToken = null }) {
  // Jwt
  let access_token, expires_at;
  const secret = process.env.JWT_SECRET;

  const timeToMiliseconds = timeExpiresAt * 60 * 60 * 1000;
  expires_at = new Date(Date.now() + timeToMiliseconds); // (dias * horas) * minutos * segundos * milisegundos
  const payload = {
    data: { fullname: user.fullname, username: user.username },
  };

  // Validar login con algún proveedor
  if (oauthAccessToken) {
    access_token = oauthAccessToken;
  } else {
    access_token = jwt.sign(payload, secret, { expiresIn: expires_at.getTime() });
  }

  return {
    access_token,
    expires_at,
  };
}

export async function verifyToken(token, callback) {
  return jwt.verify(token, process.env.JWT_SECRET, callback);
}
