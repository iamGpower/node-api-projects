const { StatusCodes } = require('http-status-codes');
const User = require('../model/User');
const BadRequestError = require('../errors/badReq-errors');

const register = async (req, res) => {
	const { name, email, password } = req.body;
	const user = await User.create({ ...req.body });
	const token = user.createToken();
	res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = (req, res) => {
	res.send(`user loggedIn`);
};

module.exports = { register, login };
