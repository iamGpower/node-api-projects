const Product = require('../model/Product');

const getAllProducts = async (req, res) => {
	// throw new Error('tasting async errors');
	// const products = await Product.find({});
	// const products = await Product.find({ isFeatured: false });
	// console.log(req.query);
	const { featured, company, name } = req.query;
	const queryObj = {};

	// switch (req.query) {
	// 	case featured:
	// 		queryObj.featured = featured === 'true' ? true : false;
	// 		break;
	// 	case company:
	// 		queryObj.company = company;
	// 		break;
	// 	case name:
	// 		queryObj.name = name;
	// 		break;

	// 	default: queryObj;
	// 		break;
	// }

	if (featured) queryObj.featured = featured === 'true' ? true : false;

	if (company) queryObj.company = company;

	if (name) queryObj.name = { $regex: name, $options: 'i' };

	console.log(queryObj);
	// const products = await Product.find(req.query);
	const products = await Product.find(queryObj);
	res
		.status(200)
		.json({ status: 'success', nbHits: products.length, msg: products });
};

module.exports = {
	getAllProducts,
};
