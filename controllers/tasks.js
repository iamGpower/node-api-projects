const getAllTasks = (req, res) => {
	res.send('Get all tasks');
};

const getTask = (req, res) => {
	res.send('Get single task');
};

const createTask = (req, res) => {
	res.json(req.body);
};

const updateTask = (req, res) => {
	res.json({ id: req.params.id });
};

const deleteTask = (req, res) => {
	res.json({ id: req.params.id });
};

module.exports = {
	getAllTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
};
