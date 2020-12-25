const router = require('express').Router();
let Team = require('../models/team.model');
const auth = require("../middleware/auth");


router.post("/add", (req, res) => {
    const { teamName, teamId } = req.body;
    const newTeam = new Team({
        teamName,
        teamId
    })
    newTeam.save()
        .then(() => res.json("Team added"))
        .catch(err => res.status(400).json("Error" + err))
})

router.get("/team-id", auth, async (req, res) => {
    const { teamName } = req.query;
    await Team.findOne({ teamName: teamName })
        .then(team => res.json(team.teamId))
        .catch(err => res.status(400).json("Error:" + err))
})

module.exports = router;