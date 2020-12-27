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



/* router.get('/remove-duplicates', async (req, res) => {
    var duplicates = []
    var cursor = Team.aggregate([
        {
            $group: {
                _id: { teamName: "$teamName" },
                dups: { "$addToSet": "$_id" },
                count: { "$sum": 1 }
            }
        },
        {
            $match: {
                count: { "$gt": 1 }
            }
        }
    ]
    )
        ; (await cursor).forEach((doc) => {
            doc.dups.shift();
            doc.dups.forEach(function (dupId) {
                duplicates.push(dupId);
            }
            )
        })
    for (var i = 0; i < duplicates.length; i++) {
        Team.findById(duplicates[i])
            .then(team => console.log(team))
    }

    Team.deleteMany({ _id: { $in: duplicates } })
    .then(() => res.json("Removed"))
}) */



