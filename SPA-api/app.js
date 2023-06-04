require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connectDB');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notfound');
const app = express();

const PORT = process.env.PORT || 5000;

// --- Error handling middlewares ---
app.use(errorHandler);
app.use(notFound);

// --- Server and DB initialization ---
const init = async () => {
	await connectDB(process.env.MONGO_URI);
	console.log(`DB connected successfully`);
	app.listen(PORT, () => {
		console.log(`Server currently listening on port ${PORT}`);
	});
};

init();
