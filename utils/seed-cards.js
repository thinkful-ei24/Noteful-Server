/* eslint-disable no-console */
'use strict';

const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');
const { Card } = require('../models/card-model');
const { User } = require('../models/user-model');
const { cards } = require('../db/data');

mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    return Promise.all([
      Card.deleteMany()
    ]);
  })
  .then(() => {
    console.info('Seeding Database');
    return User.find();
  })
  .then(users => {
    let allCards = [];
    users.forEach(user => {
      const newCards = cards.map(card => ({
        ...card,
        userId: user.id
      }));

      allCards = [...allCards, ...newCards];
    });
    return Card.insertMany(allCards);
  })
  .then(() => {
    console.info('Disconnecting');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });
