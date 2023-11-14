const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static signup method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error('Email and password are required.');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid.');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough.');
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error('Email already in use.');
  }

  const salt = await bcyrpt.genSalt(10);
  const hash = await bcyrpt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('Email and password are required.');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Email does not exist.');
  }

  const match = await bcyrpt.compare(password, user.password);

  if (!match) {
    throw Error('Invalid login credentials');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
