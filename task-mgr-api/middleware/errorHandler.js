const { CustomAPIError } = require('../errors/custom-error');

const errorHandler = async (err, req, res, next) => {
	if (err instanceof CustomAPIError) {
		return res
			.status(err.statusCode)
			.json({ success: false, msg: err.message });
	}
	// console.log(err);
	return res
		.status(500)
		.json({ success: false, msg: `Something went wrong, please try again` });
};

module.exports = errorHandler;
