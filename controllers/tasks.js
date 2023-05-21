const Task = require('../model/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({});

	res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findOne({ _id: taskID });
	console.log(task);
	if (!task) {
		return next(createCustomError(404, `no task with id ${taskID} to fetch`));
		// return res
		// 	.status(404)
		// 	.json({ success: false, msg: `no task with id ${taskID}` });
	}
	res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!task) {
		return next(createCustomError(404, `no task with id ${taskID} to update`));
		// return res
		// 	.status(404)
		// 	.json({ success: false, msg: `no task with id ${taskID} to update` });
	}
	res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskID });
	console.log(task);
	if (!task) {
		return next(createCustomError(404, `no task with id ${taskID} to delete`));
		// return res
		// 	.status(404)
		// 	.json({ success: false, msg: `no task with id ${taskID} to delete` });
	}
	res.status(200).json({ task });
});

module.exports = {
	getAllTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask,
};
