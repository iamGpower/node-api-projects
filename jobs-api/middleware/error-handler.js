const CustomAPIError = require('../errors/custom-error');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
	if (err instanceof CustomAPIError) {
		return res
			.status(err.statusCode)
			.json({ success: false, msg: err.message });
	}
	console.log(err.message);
	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ success: false, msg: err.message });
};

module.exports = errorHandlerMiddleware;
// const {} = require('../errors');
