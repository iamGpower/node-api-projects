const getAllProducts = async (req, res) => {
	// throw new Error('tasting async errors');
	res.status(200).json({ status: 'success', msg: 'Fetching all products' });
};

module.exports = {
	getAllProducts,
};
