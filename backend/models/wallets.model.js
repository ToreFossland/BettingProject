const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const walletSchema = new Schema({
    userId: { type: String, required: true },
    gnomeId: { type: String, required: true },
    name: { type: String, required: true },
    balance: { type: Number, required: true },
}, {
    timestamps: true
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;