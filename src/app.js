const express = require('express');

const { limiter } = require('./utils');
const apiRouter = require('./routes');
const { notFound, errorHandler } = require('./middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use('/api', apiRouter);

// must come AFTER all routes
app.use(notFound);
app.use(errorHandler);

module.exports = app;
