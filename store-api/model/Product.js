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
	isFeatured: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 3.0,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	company: {
		type: String,
		enum: {
			value: ['ikea', 'viva', 'bedmate'],
			message: '{Value} is not found',
		},
	},
});

module.exports = model('Product', productSchema);
