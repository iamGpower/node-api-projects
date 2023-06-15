const register = (req, res) => {
	res.send(`user registered`);
};

const login = (req, res) => {
	res.send(`user loggedIn`);
};

module.exports = { register, login };
