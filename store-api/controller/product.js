const Product = require('../model/Product');

const getAllProducts = async (req, res) => {
	// console.log(req.query);
	const { featured, company, name } = req.query;
	const queryObj = {};

	if (featured) queryObj.featured = featured === 'true' ? true : false;

	if (company) queryObj.company = company;

	if (name) queryObj.name = { $regex: name, $options: 'i' };

	console.log(queryObj);
	// const products = await Product.find(req.query);
	const products = await Product.find(queryObj).sort('-name -price');
	res
		.status(200)
		.json({ status: 'success', nbHits: products.length, msg: products });
};

module.exports = {
	getAllProducts,
};
