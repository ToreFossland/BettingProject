const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookieSchema = new Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    balance: {type: Number, required: true},
    inplay: {type: Number, required: true}
  
}, {
    timestamps: true
});

const Bookie = mongoose.model('Bookie', bookieSchema);

module.exports = Bookie;