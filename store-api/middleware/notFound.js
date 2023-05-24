const notFound = (req, res, next) =>
	res.status(404).send(`<h4>Route not found</h4>`);

module.exports = notFound;
