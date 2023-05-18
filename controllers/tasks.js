const Task = require('../model/Task');

const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(400).json({ success: false, msg: error });
	}
	// res.send('Get all tasks');
};

const getTask = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		const task = await Task.findOne({ _id: taskID });
		if (!taskID) {
			return res
				.status(400)
				.json({ success: false, msg: `no task with id ${taskID}` });
		}
		res.status(200).json({ task });
	} catch (error) {
		res.status(400).json({ success: false, msg: error });
	}
	// res.send('Get single task');
};

const createTask = async (req, res) => {
	try {
		const task = await Task.create(req.body);
		res.status(201).json({ task });
	} catch (error) {
		res.status(400).json({ success: false, msg: error });
		// console.log(error);
	}
	// res.json(req.body);
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
