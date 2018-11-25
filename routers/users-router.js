/* eslint-disable no-console */
'use strict';

const express = require('express');
const Joi = require('joi');
const { Card } = require('../models/card-model');
const { User, UserJoiSchema } = require('../models/user-model');
const { cards } = require('../db/data');
const router = express.Router();

// Create new user
router.post('/', async (req, res) => {
  const newUser = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  };

  const validation = Joi.validate(newUser, UserJoiSchema);

  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  const user = await User.findOne({ username: newUser.username });
  if (user) {
    return res.status(400).json({ error: 'Database Error: A user with that username already exists.' });
  }

  const passwordHash = await User.hashPassword(newUser.password);

  newUser.password = passwordHash;
  const createdUser = await User.create(newUser);

  const newCards = cards.map(card => ({
    ...card,
    userId: createdUser.id
  }));

  let card = await Card.create(newCards[0]);
  createdUser.head = card.id;

  await User.findOneAndUpdate({ _id: createdUser.id }, createdUser);

  for (let i = 1; i< newCards.length; i++) {
    const newCard = await Card.create(newCards[i]);
    card.next = newCard.id;
    await Card.findOneAndUpdate({ _id: card.id }, card);
    card = newCard;
  }

  return res.status(201).json(createdUser.serialize());
});

module.exports = router;