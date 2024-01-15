import JWT from "jsonwebtoken";

export async function signJwtToken({ user = {}, timeExpiresAt = 0.05, oauthAccessToken = null }) {
  // Jwt
  let access_token, expires_at;
  const secret = process.env.SECRET_API;

  const timeToMiliseconds = timeExpiresAt * 60 * 60 * 1000;
  expires_at = new Date(Date.now() + timeToMiliseconds); // (dias * horas) * minutos * segundos * milisegundos
  const payload = {
    data: { fullname: user.fullname, username: user.username },
  };

  // Validar login con algún proveedor
  if (oauthAccessToken) {
    access_token = oauthAccessToken;
  } else {
    access_token = JWT.sign(payload, secret, { expiresIn: expires_at.getTime() });
  }

  return {
    access_token,
    expires_at,
  };
}
