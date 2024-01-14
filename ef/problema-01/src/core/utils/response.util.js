export function responseHandler({ req, res }, data) {
  return res.json({
    success: true,
    result: data,
    created_at: new Date(),
  });
}

export function errorHandler({ req = undefined, res = undefined, error = Error }) {
  res.status(error.statusCode).send({
    success: false,
    error: error.message,
    created_at: new Date(),
  });
}
