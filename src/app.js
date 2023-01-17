const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const { notFound, errorHandler } = require('./middlewares');

const app = express();

require('dotenv').config();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

const cats = require('./routes/cat');

app.use('/api/cat', cats);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
