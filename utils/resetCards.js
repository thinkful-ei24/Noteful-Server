'use strict';
const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');
const { Card } = require('../models/card-model');
const { User } = require('../models/user-model');
const { cards } = require('../db/data');


const resetCards = async () => {
  mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
  await Card.deleteMany();
  const users = await User.find();

  for (let i = 0; i < users.length; i++) {
    const newCards = cards.map(card => ({
      ...card,
      userId: users[i].id
    }));

    let card = await Card.create(newCards[0]);
    users[i].head = card.id;

    await User.findOneAndUpdate({ _id: users[i].id }, users[i]);

    for (let i = 1; i< newCards.length; i++) {
      const newCard = await Card.create(newCards[i]);
      card.next = newCard.id;
      await Card.findOneAndUpdate({ _id: card.id }, card);
      card = newCard;
    }
  }

  mongoose.disconnect();
};

resetCards();