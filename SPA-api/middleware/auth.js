const { verify } = require('jsonwebtoken');
const { UnAuthenticatedError } = require('../errors');

const authMiddleware = (req, res, next) => {
	const { authorization } = req.headers;
	console.log(authorization);
	if (!authorization || !authorization.startsWith('Bearer '))
		throw new UnAuthenticatedError('No token provided');
	  const token = authorization.split(' ')[1];
	try {
		const decoded = verify(token, process.env.JWT_SECRET);
		const { id, username } = decoded;
		req.user = { id, username };

		next();
	} catch (error) {
		throw new UnAuthenticatedError('unauthorized route');
	}
};

module.exports = authMiddleware;
