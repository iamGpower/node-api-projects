require('dotenv').config();
const connectDB = require('./db/connectDb');
const Product = require('./model/Product');
const productData = require('./productData.json');

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		await Product.deleteMany();
		await Product.create(productData);
		console.log(`Connected!!`);
		process.exit(0);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

start();
