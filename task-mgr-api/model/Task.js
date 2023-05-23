const { model, Schema } = require('mongoose');

const TaskSchema = new Schema({
	name: {
		type: String,
		required: [true, 'please provide a task name '],
		trim: true,
		maxlength: [50, 'task name must not be more than 50 characters'],
	},
	completed: {
		type: Boolean,
		default: false,
	},
	date: { type: Date, default: Date.now },
});

module.exports = model('Task', TaskSchema);
