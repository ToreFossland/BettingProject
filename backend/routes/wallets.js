const router = require('express').Router();
const auth = require('../middleware/auth');
let Wallet = require('../models/wallets.model');

router.get("/", auth, async (req, res) => {
  await Wallet.find({ userId: req.user })
    .then(wallet => res.json(wallet))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/get-balance', auth, (req, res) => {
  Wallet.findOne({ gnomeId: req.body.params.gnomeId, name: req.body.params.name })
    .then(wallet => res.json(wallet.balance))
    .catch(err => res.status(400).json('Error: ' + err));
}
)

router.post("/add", auth, (req, res) => {
  const userId = req.body.userId;
  const gnomeId = req.body.gnomeId;
  const balance = req.body.balance;
  const name = req.body.name;

  const newWallet = new Wallet({
    userId,
    gnomeId,
    name,
    balance,
  });

  newWallet.save()
    .then(() => res.json('Wallet added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//If taking money out the req.body.balance must be negative
router.post('/deposit', auth, (req, res) => {
  Wallet.findOne({ gnomeId: req.body.params.gnomeId, name: req.body.params.name })
    .then(wallet => {
      wallet.balance = wallet.balance + req.body.params.sum

      wallet.save()
        .then(() => res.json('Deposited to wallet'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/withdraw', auth, (req, res) => {
  Wallet.findOne({ gnomeId: req.body.params.gnomeId, name: req.body.params.name })
    .then(wallet => {
      wallet.balance = wallet.balance - req.body.params.sum

      wallet.save()
        .then(() => res.json('Withdrawn from wallet'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/', auth, (req, res) => {
  Wallet.findOneAndDelete({ gnomeId: req.body.params.gnomeId, name: req.body.params.name })
    .then(() => res.json('Wallet deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;