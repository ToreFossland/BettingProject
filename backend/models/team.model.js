const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamName: { type: String, required: true },
    teamId: { type: Number, required: true }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;