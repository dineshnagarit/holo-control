const responseType = require('./responseType');
const cusError = require('./cusError');

const errorResponse = (message) => {
  return {
    success: false,
    message
  }
}

const successResponse = (message, data) => {
  return {
    success: true,
    message,
    data
  }
}
const sendError = (req, res, error) => {
  let code = error.code ? error.code : 500;
  res.status(code)
    .json(errorResponse(error.message));
}

const sendData = (req, res, result) => {
  res.status(result.code)
    .json(successResponse(result.message, result.data));
}

const handleError = (error, req, res, next) => {
  try {
    console.log(error)
    if (!error.code) {
      throw new cusError(responseType.INTERNAL_SERVER_ERROR, error.message || 'Opps! Something not right. Internal server error.')
    }
    if (!!error.code) {
      switch (error.code) {
        case 13: throw new cusError(responseType.UNAUTHORIZED, 'User not authorized to access database');
        case 18: throw new cusError(responseType.BAD_REQUEST, 'Authentication failed for database');
        case 14: throw new cusError(responseType.BAD_REQUEST, 'Type mismatch');
        case 22: throw new cusError(responseType.BAD_REQUEST, 'BSON Object is Invalid');
        case 27: throw new cusError(responseType.BAD_REQUEST, 'Mongo Index not found.');
        case 30: throw new cusError(responseType.NOT_ACCEPTABLE, 'Improper data (Path is invalid)');
        case 60: throw new cusError(responseType.INTERNAL_SERVER_ERROR, 'Database not found');
        case 121: throw new cusError(responseType.INTERNAL_SERVER_ERROR, 'Can\'t be saved in DB. Mongo Document validation failure');
        case 11000: throw new cusError(responseType.NOT_ACCEPTABLE, 'Duplicate data exists');
        case 'ECONNRESET': throw new cusError(responseType.BAD_GATEWAY, 'Service is down');
        case 'ECONNREFUSED': throw new cusError(responseType.BAD_GATEWAY, 'Connection is refused or service is down.');
      };

      logger.log(`error`, req, res, error.message);
      logger.log(`debug`, req, res, error.message, { error }, ['meta']);
    }
    sendError(req, res, error);
  }
  catch (error) {
    sendError(req, res, error);
  }
};

module.exports = {
  handleError,
  sendData,
  successResponse
};
