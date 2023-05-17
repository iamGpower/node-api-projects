const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
	// console.log(req);
	res.send('Welcome to Task Manager');
});

app.use('/api/v1/tasks', tasks);

app.listen(PORT, console.log(`Server listening on port ${PORT} ...`));
