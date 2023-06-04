const Product = require('../model/Product');

const getAllProducts = async (req, res) => {
	// console.log(req.query);
	const { featured, company, name, sort, fields, numericFilters } = req.query;
	const queryObj = {};

	if (featured) queryObj.featured = featured === 'true' ? true : false;

	if (company) queryObj.company = company;

	if (name) queryObj.name = { $regex: name, $options: 'i' };

	if (numericFilters) {
		const operatorMap = {
			'>': '$gt',
			'>=': '$gte',
			'=': '$eq',
			'<': '$lt',
			'<=': '$lte',
		};
		const regEx = /\b(<|>|>=|=|<|<=)\b/g;
		const filters = numericFilters.replace(
			regEx,
			(match) => `-${operatorMap[match]}-`,
		);
		const options = ['price', 'rating'];
		filters.split(',').forEach((item) => {
			const [field, operator, value] = item.split('-');
			if (options.includes(field)) {
				queryObj[field] = { [operator]: Number(value) };
			}
			console.log(item);
		});
		console.log(queryObj);
		console.log(numericFilters);
		console.log(filters);
	}

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

	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	result = result.skip(skip).limit(limit);
	const products = await result;
	res
		.status(200)
		.json({ status: 'success', nbHits: products.length, msg: products });
};

module.exports = {
	getAllProducts,
};
