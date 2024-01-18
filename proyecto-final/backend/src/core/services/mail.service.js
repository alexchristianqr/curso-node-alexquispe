import { createTransport } from "nodemailer";
import { config } from "dotenv";

config();

// Variables
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const secure = process.env.MAIL_SECURE === "true";
const username = process.env.MAIL_USERNAME;
const password = process.env.MAIL_PASSWORD;
const fromAddress = process.env.MAIL_FROM_ADDRESS;
const isBlocked = process.env.MAIL_TRANSPORT_BLOCK === "true";

// Establecer conexión
const transporter = () => {
  if (isBlocked) return true;
  return createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: username,
      pass: password,
    },
    debug: false,
    logger: true,
    tls: {
      rejectUnauthorized: false,
    },
  });
};

class MailService {
  async sendMailSingle({ send = null, preview = null, from = null, to, subject, message }) {
    try {
      if (isBlocked) return true;
      const response = await transporter.sendMail({
        from: from ? from : fromAddress,
        to,
        subject,
        html: `<div>${message}</div>`,
      });
      console.log("UUID:", response.messageId);
    } catch (error) {
      return error;
    }
  }
}

export const mailService = new MailService();