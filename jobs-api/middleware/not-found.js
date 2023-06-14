const { StatusCodes } = require('http-status-codes');
const notFound = (req, res, next) => {
	res.statusCode(StatusCodes.NOT_FOUND).send(`
  <h4>Route not found</h4>
  <br/>
  <a href="/">Return Home</a>
  `);
};

module.exports = notFound;
