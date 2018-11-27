'use strict';
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  head: {
    type: String
  }
});

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username || '',
    name: this.name || '',
    head: this.head
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

const UserJoiSchema = Joi.object().keys({
  name: Joi.string().min(1).trim().required(),
  username: Joi.string().alphanum().min(1).max(30).trim().required(),
  password: Joi.string().min(10).max(30).trim().required()
});


module.exports = { User, UserJoiSchema };