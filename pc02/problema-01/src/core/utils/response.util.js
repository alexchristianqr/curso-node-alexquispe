export function responseHandler({ req, res }, data) {
  return res.json({
    success: true,
    result: data,
  });
}

export function errorHandler({ req = undefined, res = undefined, error = Error }) {
  res.status(error.statusCode).send({
    success: false,
    error: error.message,
  });
}
