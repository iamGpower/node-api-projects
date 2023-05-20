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
		console.log(task);
		if (!task) {
			return res
				.status(404)
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

const updateTask = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
			new: true,
			runValidators: true,
		});
		if (!task) {
			return res
				.status(404)
				.json({ success: false, msg: `no task with id ${taskID} to update` });
		}
		res.status(200).json({ task });
		// res.json({ id: req.params.id });
	} catch (error) {
		res.status(400).json({ success: false, msg: error });
	}
};

const deleteTask = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		const task = await Task.findOneAndDelete({ _id: taskID });
		console.log(task);
		if (!task) {
			return res
				.status(404)
				.json({ success: false, msg: `no task with id ${taskID} to delete` });
		}
		res.status(200).json({ task });
	} catch (error) {
		res.status(400).json({ success: false, msg: error });
	}
	// res.json({ id: req.params.id });
};

module.exports = {
	getAllTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
};
