const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFoundRoute = require('./middleware/notfound');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();
const { MONGO_URI } = process.env;
const { PORT } = process.env;

// middlewares
app.use(express.json());
app.use(express.static('./public'));

// routes
app.use('/api/v1/tasks', tasks);
app.use(notFoundRoute);
app.use(errorHandler);

// Init DB connection before spinning server
const init = async () => {
	try {
		await connectDB(MONGO_URI);
		console.log('DB Connected ....');
		app.listen(PORT, console.log(`Server listening on port ${PORT} ...`));
	} catch (error) {
		console.log(error);
	}
};

init();
