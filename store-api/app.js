require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const connectDB = require('./db/connectDb');
const productRouter = require('./routes/products');

const PORT = process.env.PORT || 5000;

// Custom Middleware
const notFoundMiddleware = require('./middleware/notFound');
const errorMiddleware = require('./middleware/errorHandler');

// Builtin Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
	res.send(`<h2>Store API</h2><a href="/api/v1/products">back to products</a>`);
});

app.use('/api/v1/products', productRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const init = async () => {
	try {
		// Connect to DB
		// console.log(connectDB)
		await connectDB(process.env.MONGO_URI);
		console.log('DB Connected ....');
		app.listen(PORT, () =>
			console.log(`Server currently listening at http://localhost:${PORT}`),
		);
	} catch (error) {
		console.log(error.message);
	}
};

init();
