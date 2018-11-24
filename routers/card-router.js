'use strict';

const express = require('express');
const passport = require('passport');

const { Card } = require('../models/card-model');

const router = express.Router();
const options = { session: false, failWithError: true };
const jwtAuth = passport.authenticate('jwt', options);

router.get('/', jwtAuth, (req, res, next) => {
  const userId = req.user.id;

  return Card.find({ userId })
    .sort() // implement late to get first card
    .then(results => res.json(results[0]))
    .catch(err => next(err));
});

module.exports = router;