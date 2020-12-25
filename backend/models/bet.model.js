const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

const betSchema = new Schema({
  userId: { type: String, required: true },
  gnomeId: { type: String, required: true },
  betDate: { type: Date, required: true },
  homeTeam: { type: String },
  awayTeam: { type: String },
  event: { type: String },
  eventType: { type: String },
  backOdds: { type: Number, required: true },
  layOdds: { type: Number, required: true },
  backAmount: { type: Number, required: true },
  layAmount: { type: Number, required: true },
  bookie: { type: String, required: true },
  exchange: { type: String, required: true },
  commission: { type: Number, required: true },
  sport: { type: String, required: true },
  freebet: { type: String, required: true },
  outcome: { type: String, required: true },
  settled: { type: Boolean },
  didWin: { type: Boolean },
  overUnder: { type: Number } //Needed if enevntType is over/under
}, {
  timestamps: true
});

const Bet = mongoose.model('Bet', betSchema);

module.exports = Bet;