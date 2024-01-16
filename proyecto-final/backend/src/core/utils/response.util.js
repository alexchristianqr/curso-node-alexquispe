import { httpStatusCodes } from "../enums/index.js";

export function responseHandler({ req, res }, data) {
  return res.json({
    success: true,
    result: data,
    created_at: new Date(),
  });
}

export function errorHandler({ req, res, error = Error }) {
  const statusCode = error.statusCode ? error.statusCode : httpStatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).send({
    success: false,
    error: error.message,
    created_at: new Date(),
  });
}