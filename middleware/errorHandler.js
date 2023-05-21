const errorHandler = (err, req, res, next) => {
	console.log(err);
	return res.status(500).json({ success: false, msg: err });
};

module.exports = errorHandler;
