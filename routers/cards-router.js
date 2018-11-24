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
    .sort() // implement later to get first card
    .then(cards => res.json(cards[0]))
    .catch(err => next(err));
});

router.get('/:id', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;

  return Card.findOne({ userId, _id: id })
    .then(card => res.json(card))
    .catch(err => next(err));
});

module.exports = router;