const { sign } = require('jsonwebtoken');
const {BadRequestError}= require('../errors');
const {StatusCodes} = require('http-status-codes')

const login = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password)
		throw new BadRequestError('Please provide email and password');

	const id = new Date().getDate();
	const token = sign({ id, username }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});
	// user = username;
	res.status(StatusCodes.OK).json({ status: 'success', msg: `user created`, token });
};

const dashboard = async (req, res) => {
	const { id, username } = req.user;
	console.log(id, username);
	const luckyNumber = Math.floor(Math.random() * 100);
	res.status(StatusCodes.OK).json({
		status: 'success',
		secret: `Here is your lucky number ${luckyNumber}`,
		msg: `Hello, ${username}!`,
	});
};

module.exports = { login, dashboard };
