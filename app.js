const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const PORT = 3000;
const { MONGO_URI } = process.env;

app.use(express.json());

app.use(express.static('./public'))

// app.get('/', (req, res) => {
// 	res.send('Welcome to Task Manager');
// });

app.use('/api/v1/tasks', tasks);

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
