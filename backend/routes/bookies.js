const router = require('express').Router();
let Bookie = require('../models/bookie.model');
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  await Bookie.find({ userId: req.user })
    .then(bookie => res.json(bookie))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/gnome-bookies", auth, async (req, res) => {
  await Bookie.find({ userId: req.user, gnomeId: req.body.gnomeId })
    .then(bookie => res.json(bookie))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {
  Bookie.findOneAndDelete({ username: req.body.username, name: req.body.name })
    .then(() => res.json('Bookie deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get-balance').get((req, res) => {
  Bookie.findOne({ username: req.body.username })
    .then(bookie => res.json(bookie.balance))
    .catch(err => res.status(400).json('Error: ' + err));
}
)

router.route('/get-inplay/').get((req, res) => {
  Bookie.findOne({ username: req.body.username })
    .then(bookie => res.json(bookie.inplay))
    .catch(err => res.status(400).json('Error: ' + err));
}
)


router.post("/add", auth, (req, res) => {
  const { userId, gnomeId, name, balance } = req.body;
  if (balance) {
    const newBookie = new Bookie({
      userId,
      gnomeId,
      name,
      balance,
      inplay: 0
    });
    newBookie.save()
      .then(() => res.json('Bookie added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else {
    const newBookie = new Bookie({
      userId,
      gnomeId,
      name,
      balance: 0,
      inplay: 0
    });
    newBookie.save()
      .then(() => res.json('Bookie added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }

});

//If taking money out the req.body.balance must be negative
router.route('/update-balance').post((req, res) => {
  Bookie.findOne({ username: req.body.username, name: req.body.name })
    .then(bookie => {
      bookie.balance = bookie.balance + req.body.balance

      bookie.save()
        .then(() => res.json('Bookie updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update-inplay/').post((req, res) => {
  Bookie.findOne({ username: req.body.username, name: req.body.name })
    .then(bookie => {
      bookie.inplay = bookie.inplay + req.body.inplay

      bookie.save()
        .then(() => res.json('Bookie updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;