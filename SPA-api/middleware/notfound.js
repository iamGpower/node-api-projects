const { StatusCodes } = require('http-status-codes');

const notFound = (req, res, next) =>
	res.status(StatusCodes.NOT_FOUND).send(`<h4>Route not found</h4>`);

module.exports = notFound;
