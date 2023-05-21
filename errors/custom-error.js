class CustomAPIError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}
}

const createCustomError = (statusCode, message) => {
	return new CustomAPIError(statusCode, message);
};

module.exports = { createCustomError, CustomAPIError };
