const { model, Schema } = require('mongoose');

const TaskSchema = new Schema({
	name: String,
	completed: Boolean,
	date: { type: Date, default: Date.now },
});

module.exports = model('Task', TaskSchema);
