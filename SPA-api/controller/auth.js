let user = '';
const login = async (req, res) => {
	const { username, password } = req.body;
	console.log(username, password);
	user = username;
	res.status(200).json({ status: 'success', msg: `Fake Login/Register ` });
};

const dashboard = async (req, res) => {
	const luckyNumber = Math.floor(Math.random() * 100);
	res.status(200).json({
		status: 'success',
		secret: `Here is your lucky number ${luckyNumber}`,
		msg: `Hello, ${user}!`,
	});
};

module.exports = { login, dashboard };
