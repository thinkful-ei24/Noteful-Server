'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const { Card } = require('../models/card-model');
const { User } = require('../models/user-model');

const router = express.Router();
const options = { session: false, failWithError: true };
const jwtAuth = passport.authenticate('jwt', options);

const insertCard = async (userId, card) => {
  const { memory, correct, total, next, id: cardId } = card;
  const user = await User.findOne({ _id: userId });
  // const updateCard = await Card.findOne({ userId, _id: cardId });
  let head = user.head;
  if (head === cardId) {
    // if the update card is the head, change the head
    // if it isn't don't change the head
    head = next;
    await User.findOneAndUpdate({ _id: userId }, { head });
  }

  const cards = await Card.find({ userId });
  let cardsLookup = {};
  cards.forEach(card => {
    cardsLookup[card.id] = card;
  });

  let counter = 1;
  let tempCard = cardsLookup[head];

  // find the position the put the card
  while (counter < memory && tempCard.next) {
    counter++;
    tempCard = cardsLookup[tempCard.next];
  }

  // the card you put in will point to the next value of the card before
  const updateData = { memory, correct, total, next: tempCard.next };
  await Card.findOneAndUpdate({ userId, _id: cardId }, updateData);
  // the card before will point to the card you are putting in
  await Card.findOneAndUpdate({ userId, _id: tempCard.id }, { next: cardId });
};

router.get('/', jwtAuth, (req, res, next) => {
  const userId = req.user.id;

  return Card.find({ userId })
    .sort('note')
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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  try {
    await insertCard(userId, req.body);
    res.json();
  } catch (e) {
    next(e);
  }
});


module.exports = router;