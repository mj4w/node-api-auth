const createError = require('http-errors')

function createErrorHandler(statusCode, defaultMessage){
    return (message = defaultMessage) => {
        const error = new Error(message);
        error.status = statusCode;
        return error;
    };
}

const errorHandler = {
    BadRequest: createErrorHandler(400, 'Bad Request'),
    Unauthorized: createErrorHandler(401, 'Unauthorized'),
    Forbidden: createErrorHandler(403, 'Forbidden'),
    NotFound: createErrorHandler(404, 'Not Found'),
    InternalServerError: createErrorHandler(500, 'Internal Server Error'),
    NotImplemented: createErrorHandler(501, 'Not Implemented')
}

module.exports = errorHandler;