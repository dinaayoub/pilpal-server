'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('../models/users');
const basicAuth = require('../middleware/basic');
const bearerAuth = require('../middleware/bearer');
const permissions = require('../middleware/acl');

authRouter.post('/signup', async (req, res, next) => {
  let user = new User(req.body);
  const userRecord = await user.save();
  const output = {
    user: userRecord,
    token: userRecord.token,
  };
  res.status(201).json(output);

});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  try {
    const users = await User.find({});
    const list = users.map(user => user.username);
    res.status(200).json(list);
  }
  catch (error) {
    res.status(500).send(error);
  }
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area');
});

module.exports = authRouter;
