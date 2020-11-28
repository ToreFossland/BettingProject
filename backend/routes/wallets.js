const router = require('express').Router();
const auth = require('../middleware/auth');
let Wallet = require('../models/wallets.model');

router.get("/", auth, async (req, res) => {
  await Wallet.find({ userId: req.user })
    .then(wallet => res.json(wallet))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {
  Wallet.findOneAndDelete({ username: req.body.username, name: req.body.name })
    .then(() => res.json('Wallet deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get-balance').get((req, res) => {
  Wallet.findOne({ username: req.body.username })
    .then(wallet => res.json(wallet.balance))
    .catch(err => res.status(400).json('Error: ' + err));
}
)


router.post("/add", auth, (req, res) => {
  const userId = req.body.userId;
  const balance = req.body.balance;
  const name = req.body.name;

  const newWallet = new Wallet({
    userId,
    name,
    balance,
  });

  newWallet.save()
    .then(() => res.json('Wallet added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//If taking money out the req.body.balance must be negative
router.route('/deposit').post((req, res) => {
  Wallet.findOne({ username: req.body.username, name: req.body.name })
    .then(wallet => {
      wallet.balance = wallet.balance + req.body.balance

      wallet.save()
        .then(() => res.json('Wallet updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/withdraw').post((req, res) => {
  Wallet.findOne({ username: req.body.username, name: req.body.name })
    .then(wallet => {
      wallet.balance = wallet.balance - req.body.balance

      wallet.save()
        .then(() => res.json('Wallet updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;