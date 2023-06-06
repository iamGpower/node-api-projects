class CustomAPIError extends Error {
	constructor(message) {
		super(message);
	}
}

const createCustomError = (statusCode, message) => {
	return new CustomAPIError(statusCode, message);
};

module.exports = CustomAPIError
