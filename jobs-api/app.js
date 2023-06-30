require('dotenv').config();
require('express-async-errors');

// security packages
const helmet = require('helmet');
const cors = require('cors');
const ratelimiter = require('express-rate-limit');

const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const connectDB = require('./db/connect');
const authMiddleware = require('./middleware/auth');
const app = express();

const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to API calls only

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
	res.send(`<h2>🎉 Welcome to Jobs API 😊 </h2>`);
});
// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authMiddleware, jobsRouter);

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log(`JobsAPI DB connected successfully`);
		app.listen(PORT, () => {
			console.log(`Server currently listening on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
