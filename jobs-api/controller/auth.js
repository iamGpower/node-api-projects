const { StatusCodes } = require('http-status-codes');
const User = require('../model/User');
const { UnAuthenticatedError, BadRequestError } = require('../errors');

const register = async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });
	if (userExists)
		return res
			.status(StatusCodes.FORBIDDEN)
			.json({ msg: `user already exist` });

	const user = await User.create({ ...req.body });
	const token = user.createToken();

	res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
	
	const { email, password } = req.body;
	if (!email || !password)
		throw new BadRequestError('Please provide email and password');

	const user = await User.findOne({ email });
	if (!user) throw new UnAuthenticatedError('Invalid credentials');

	const isCorrectPassword = await user.confirmPassword(password);
	if (!isCorrectPassword) throw new UnAuthenticatedError('Invalid Credentials');

	const token = user.createToken();
	res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
