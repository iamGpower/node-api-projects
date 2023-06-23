// const CustomAPIError = require('../errors/custom-error');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
	const customError = {
		// set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong',
	};
	// if (err instanceof CustomAPIError) {
	// 	return res
	// 		.status(err.statusCode)
	// 		.json({ success: false, msg: err.message });
	// }
	console.log(err);

	if (err.name === 'ValidationError') {
		customError.msg = Object.values(err.errors)
			.map((errItem) => errItem.message)
			.join(', ');
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}

	if (err.code && err.code === 11000) {
		customError.msg = `Duplicate value entered for ${err.keyValue.email} field, please choose another value`;
		customError.statusCode = StatusCodes.BAD_REQUEST;
	}
	// return res
	// 	.status(StatusCodes.INTERNAL_SERVER_ERROR)
	// 	.json({ success: false, msg: err });
	// console.log(err.message);
	return res
		.status(customError.statusCode)
		.json({ success: false, msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
// const {} = require('../errors');
