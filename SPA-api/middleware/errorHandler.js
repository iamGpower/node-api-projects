const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandler = async (err, req, res, next) => {
	if (err instanceof CustomAPIError) {
		return res
			.status(err.statusCode)
			.json({ success: false, msg: err.message });
	}
	console.log({ msg: err.message, msgStack: err.stack });
	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ success: false, msg: `Something went wrong, please try again` });
};

module.exports = errorHandler;
