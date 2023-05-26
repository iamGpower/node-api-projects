const getAllProducts = async (req, res) => {
	res.status(200).json({ status: 'success', msg: 'Fetching all products' });
};

module.exports = {
	getAllProducts,
};
