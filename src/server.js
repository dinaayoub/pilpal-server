'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
// const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFoundHandler = require('./error-handlers/404.js');
const logger = require('./middleware/logger.js');
const authRoutes = require('./routes/auth-routes.js');
const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
// app.use(morgan('dev'));
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
app.use(authRoutes);

app.get('/', (req, res) => {
  res.status(200).send('hi there');
});

// Catchalls
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      if (!port) { throw new Error('Missing Port'); }
      console.log(`Server up on ${port}`);
    });
  },
};






