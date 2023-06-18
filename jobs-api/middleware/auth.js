require('dotenv').config();
const { verify } = require('jsonwebtoken');
const User = require('../model/User');
const { UnAuthenticatedError } = require('../errors');

const authMiddleware = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization || !authorization.startsWith('Bearer '))
		throw new UnAuthenticatedError('No token provided');
	const token = authorization.split(' ')[1];
	try {
		const { userId, userName } = verify(token, process.env.JWT_SECRET);
		req.user = { userId, userName };
		next();
	} catch (error) {
		throw new UnAuthenticatedError(`Invalid authentication: ${error.message}`);
	}
};
module.exports = authMiddleware;
