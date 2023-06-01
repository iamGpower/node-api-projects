const Product = require('../model/Product');

const getAllProducts = async (req, res) => {
	// console.log(req.query);
	const { featured, company, name, sort, fields } = req.query;
	const queryObj = {};

	if (featured) queryObj.featured = featured === 'true' ? true : false;

	if (company) queryObj.company = company;

	if (name) queryObj.name = { $regex: name, $options: 'i' };

	console.log(queryObj);

	let result = Product.find(queryObj);

	if (sort) {
		let sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	} else {
		result = result.sort('createdAt');
	}

	if (fields) {
		let sortList = fields.split(',').join(' ');
		console.log(sortList);
		result = result.select(sortList);
	}
	const products = await result;
	res
		.status(200)
		.json({ status: 'success', nbHits: products.length, msg: products });
};

module.exports = {
	getAllProducts,
};
