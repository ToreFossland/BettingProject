/* const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  gnomes: {
    type: [{username: String}]
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User; */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  gnomes: { type: [{ name: String, gnomeId: String }] }
});

module.exports = User = mongoose.model("user", userSchema);