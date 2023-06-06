require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connectDB');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notfound');
const app = express();
const auth = require('./routes/auth');

const PORT = process.env.PORT || 5000;

// --- Routes ---
app.use(express.json());
app.use('/api/v1', auth);

// --- Error handling middlewares ---
app.use(express.static('./public'));
app.use(errorHandler);
app.use(notFound);

// --- Server and DB initialization ---
const init = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		console.log(`DB connected successfully`);
		app.listen(PORT, () => {
			console.log(`Server currently listening on port ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

init();
