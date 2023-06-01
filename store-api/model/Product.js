const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Please provide a product name'],
	},
	price: {
		type: Number,
		required: [true, 'Please provide a product price'],
	},
	featured: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 3.0,
	},
	company: {
		type: String,
		enum: {
			values: ['ikea', 'viva', 'bedmate'],
			message: '{Value} is not found',
		},
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = model('Product', productSchema);
