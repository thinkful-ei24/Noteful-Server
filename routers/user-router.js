/* eslint-disable no-console */
'use strict';

const express = require('express');
const Joi = require('joi');
const { User, UserJoiSchema } = require('../models/user-model');
const router = express.Router();

// Create new user
router.post('/', (req, res) => {
  console.log(req);
  const newUser = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  };

  const validation = Joi.validate(newUser, UserJoiSchema);

  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  User.findOne({
    $or: [
      { email: newUser.email },
      { username: newUser.username }
    ]
  }).then(user => {
    if (user) {
      return res.status(400).json({ error: 'Database Error: A user with that username and/or email already exists.' });
    }
    return User.hashPassword(newUser.password);
  }).then(passwordHash => {
    newUser.password = passwordHash;
    User.create(newUser)
      .then(createdUser => {
        return res.status(201).json(createdUser.serialize());
      })
      .catch(error => {
        console.error(error);
        return res.status(500).json({
          error: error.message
        });
      });
  });
});

module.exports = router;