import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
};

export const notFoundHandler = (req, res, next) => {
  next(createHttpError(404, 'Resource not found'));
};