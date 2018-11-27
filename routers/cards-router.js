'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const { Card } = require('../models/card-model');
const { User } = require('../models/user-model');

const router = express.Router();
const options = { session: false, failWithError: true };
const jwtAuth = passport.authenticate('jwt', options);

router.get('/', jwtAuth, (req, res, next) => {
  const userId = req.user.id;

  return Card.find({ userId })
    .sort()
    .then(cards => res.json(cards.map(card => card.serialize())))
    .catch(err => next(err));
});

router.get('/first', jwtAuth, async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findOne({ _id: userId });
  const head = user.head;

  return Card.find({ userId, _id: head })
    .sort()
    .then(cards => cards? res.json(cards[0].serialize()) : next())
    .catch(err => next(err));
});

router.get('/:id', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  return Card.findOne({ userId, _id: id })
    .then(card => card ? res.json(card.serialize()) : next())
    .catch(err => next(err));
});

router.patch('/:id', jwtAuth, async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  const { memory, correct, total } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  try {
    // put card at back for now (make next null)
    const updateCard = { memory, correct, total, next: null };
    const updatedCard = await Card.findOneAndUpdate({ userId, _id: id }, updateCard);

    // update previous last card and head pointer
    await Card.findOneAndUpdate({ next: null }, { next: updatedCard.id });
    await User.findOneAndUpdate({ _id: userId }, { head: updatedCard.next });
    res.json();
  } catch (e) {
    next(e);
  }
});

module.exports = router;