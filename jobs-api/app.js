require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('jobs api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		app.listen(PORT, () => {
			console.log(`Server currently listening on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
