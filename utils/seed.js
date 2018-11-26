/* eslint-disable no-console */
'use strict';

const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

const { Card } = require('../models/card-model');
const { User } = require('../models/user-model');

const users = [
  {
    _id: '000000000000000000000001',
    name: 'test user',
    username: 'tester',
    // password123
    password: '$2a$10$mWrEfD0x.0mTueeicHtncuBmLhhq7PaQB3bLWzlpcyokBqEdfshOq'
  }
];

const cards = [
  {
    _id: '100000000000000000000001',
    userId: '000000000000000000000001',
    note: 'C',
    next: '100000000000000000000002'
  },
  {
    _id: '100000000000000000000002',
    userId: '000000000000000000000001',
    note: 'E',
    next: '100000000000000000000003'
  },
  {
    _id: '100000000000000000000003',
    userId: '000000000000000000000001',
    note: 'G'
  }
];

mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    return Promise.all([
      User.deleteMany(),
      Card.deleteMany()
    ]);
  })
  .then(() => {
    console.info('Seeding Database');
    return Promise.all([
      User.insertMany(users),
      Card.insertMany(cards)
    ]);
  })
  .then(results => {
    console.log('Inserted', results);
    console.info('Disconnecting');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });