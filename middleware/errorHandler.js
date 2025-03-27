const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    let errorResponse = {
        title: "Error",
        message: err.message,
        stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
    };

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            errorResponse.title = "Validation Failed";
            break;
        case constants.UNAUTHORIZED:
            errorResponse.title = "Unauthorized";
            break;
        case constants.FORBIDDEN:
            errorResponse.title = "Forbidden";
            break;
        case constants.NOT_FOUND:
            errorResponse.title = "Not Found";
            break;
        case constants.SERVER_ERROR:
            errorResponse.title = "Server Error";
            break;
        default:
            console.log("No error, all good!");
            return next();
    }

    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
