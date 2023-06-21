const { Schema, Types, model } = require('mongoose');

const JobSchema = new Schema(
	{
		company: {
			type: String,
			required: [true, 'Please provide a company name'],
			maxLength: 50,
		},
		position: {
			type: String,
			required: [true, 'Please provide position'],
			maxLength: 70,
		},
		status: {
			type: String,
			enum: ['interview', 'declined', 'pending'],
			default: 'pending',
		},
		createdBy: {
			type: Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide a user'],
		},
	},
	{ timestamps: true },
);

module.exports = model('Job', JobSchema);
