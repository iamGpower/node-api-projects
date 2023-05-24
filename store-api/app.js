require('dotenv').config();
// async errors

const express = require('express');
const notFound = require('./middleware/notFound'); 
const app = express();

app.use(notFound)

