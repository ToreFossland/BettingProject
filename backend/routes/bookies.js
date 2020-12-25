const router = require('express').Router();
let Bookie = require('../models/bookie.model');
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  await Bookie.find({ userId: req.user })
    .then(bookie => res.json(bookie))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete("/", auth, async (req, res) => {
  await Bookie.findOneAndDelete({ username: req.body.username, name: req.body.name })
    .then(() => res.json('Bookie deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/get-balance", auth, async (req, res) => {
  await Bookie.findOne({ gnomeId: req.body.id, name: req.body.name })
    .then(bookie => res.json(bookie.balance))
    .catch(err => res.status(400).json('Error: ' + err));
}
)

router.get("/get-inplay/", auth, async (req, res) => {
  await Bookie.findOne({ gnomeId: req.body.id, name: req.body.name })
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

router.post('/deposit', async (req, res) => {
  await Bookie.findOne({ gnomeId: req.body.params.id, name: req.body.params.name })
    .then(bookie => {
      bookie.balance = bookie.balance + req.body.params.balance

      bookie.save()
        .then(() => res.json('Funds deposited to Bookie!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/withdraw', async (req, res) => {
  await Bookie.findOne({ gnomeId: req.body.params.id, name: req.body.params.name })
    .then(bookie => {
      bookie.balance = bookie.balance - req.body.params.balance

      bookie.save()
        .then(() => res.json('Funds withdrawn from Bookie!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/set-bet', async (req, res) => {
  Bookie.findOne({ gnomeId: req.body.params.id, name: req.body.params.name })
    .then(bookie => {
      bookie.balance -= req.body.params.backAmount
      bookie.inplay += req.body.params.backAmount
      bookie.save()
        .then(() => res.json('Bookie updated according to bet'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/bet-won', async (req, res) => {
  await Bookie.findOne({ gnomeId: req.body.params.id, name: req.body.params.name })
    .then(bookie => {
      bookie.inplay -= req.body.params.backAmount
      bookie.balance += req.body.params.backAmount * req.body.params.odds

      bookie.save()
        .then(() => res.json(bookie))
        .catch(err => res.status(400).json("Error:" + err))
    })
    .catch(err => res.status(400).json("Error:" + err))
})

router.post('/bet-lost', async (req, res) => {
  await Bookie.findOne({ gnomeId: req.body.params.id, name: req.body.params.name })
    .then(bookie => {
      bookie.inplay -= req.body.params.backAmount

      bookie.save()
        .then(() => res.json(bookie))
        .catch(err => res.status(400).json("Error:" + err))
    })
    .catch(err => res.status(400).json("Error:" + err))
})


module.exports = router;