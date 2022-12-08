const express = require('express');
const dotenv = require('dotenv');
const router = require('./routers/index.js');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// app.listen(process.env.PORT);
module.exports = app;
