const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookieSchema = new Schema({
    userId: { type: String, required: true },
    gnomeId: { type: String },
    name: { type: String, required: true },
    balance: { type: Number },
    inplay: { type: Number }

}, {
    timestamps: true
});

const Bookie = mongoose.model('Bookie', bookieSchema);

module.exports = Bookie;