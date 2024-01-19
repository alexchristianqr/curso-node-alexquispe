import { createTransport } from "nodemailer";
import { config } from "dotenv";
import { httpStatusCodes } from "../enums/index.js";

config();

// Variables
const service = process.env.MAIL_SERVICE;
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const secure = process.env.MAIL_SECURE === "true";
const username = process.env.MAIL_USERNAME;
const password = process.env.MAIL_PASSWORD;
const fromAddress = process.env.MAIL_FROM_ADDRESS;
const isBlocked = process.env.MAIL_TRANSPORT_BLOCK === "true";
const isLoggerDebug = process.env.MAIL_LOGGER_DEBUG === "true";

// Establecer conexión
const transporter = (() => {
  if (isBlocked) return true;
  let configTransport = {};

  switch (service) {
    case "mailtrap":
      configTransport = {
        host: host,
        port: port,
        secure: secure,
        auth: {
          user: username,
          pass: password,
        },
        debug: isLoggerDebug,
        logger: isLoggerDebug,
        tls: {
          rejectUnauthorized: false,
        },
      };
      break;
    case "gmail":
      configTransport = {
        service: service,
        auth: {
          user: username,
          pass: password,
        },
        debug: isLoggerDebug,
        logger: isLoggerDebug,
      };
      break;
    default:
      throw { message: "El servicio de email no está disponible", status: httpStatusCodes.INTERNAL_SERVER_ERROR };
  }

  return createTransport(configTransport);
})();

class MailService {
  async sendMailSingle({ send = null, preview = null, from = null, to, subject, message }) {
    console.log("[MailService.sendMailSingle]");
    try {
      if (isBlocked) return true;

      const mailOptions = {
        from: from ? from : fromAddress,
        to,
        subject,
        html: `<div>${message}</div>`,
      };
      const { messageId } = await transporter.sendMail(mailOptions);

      console.log("UUID:", messageId);

      return messageId;
    } catch (error) {
      return error;
    }
  }
}

export const mailService = new MailService();
