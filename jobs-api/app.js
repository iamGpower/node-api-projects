require('dotenv').config();
require('express-async-errors');
const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const connectDB = require('./db/connect');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log(`DB connected successfully`);
		app.listen(PORT, () => {
			console.log(`Server currently listening on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
