const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

const betSchema = new Schema({
  username: {type: String, required: true},
  placeDate: {type: Date, required: true},
  betDate: {type: Date, required: true},
  event: {type: String, required: true},
  backOdds: {type: Number, required: true},
  layOdds: {type: Number, required: true},
  backAmount: {type: Number, required: true},
  layAmount: {type: Number, required: true},
  bookie: {type: String, required: true},
  exchange: {type: String, required: true},
  commission: {type: Number, required: true},
  sport: {type: String, required: true},
  freebet: {type: String, required: true},
  outcome: {type: String, required: true}
}, {
    timestamps: true
});

const Bet = mongoose.model('Bet', betSchema);

module.exports = Bet;