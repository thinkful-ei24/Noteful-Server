'use strict';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const CardSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  note: {
    type: String,
    required: true
  },
  memory: {
    type: Number,
    required: true,
    default: 1
  },
  next: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  },
  correct: {
    type: Number,
    required: true,
    default: 0
  },
  total: {
    type: Number,
    required: true,
    default: 0
  }
});

CardSchema.methods.serialize = function() {
  return {
    userId: this.userId,
    note: this.note,
    memory: this.memory,
    next: this.next,
    correct: this.correct,
    total: this.total
  };
};

const Card = mongoose.model('Card', CardSchema);

module.exports = { Card };