const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
    userId: { type: String, required: true },
    gnomeId: { type: String },
    name: { type: String, required: true },
    balance: { type: Number },
    inplay: { type: Number }

}, {
    timestamps: true
});

const Exchange = mongoose.model('Exchange', exchangeSchema);

module.exports = Exchange;