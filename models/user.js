const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User schema 
const UserSchema = mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User1 = mongoose.model('User', UserSchema);

User1.getUserById = function (id, callback) {
  User1.findById(id, callback);
}

User1.getUserByUsername = function (userid, callback) {
  const query = { userid: userid };
  User1.findOne(query, callback);
}

User1.getAll = function (callback) {
  User1.find(callback);
}

User1.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

User1.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}

module.exports = User1;
