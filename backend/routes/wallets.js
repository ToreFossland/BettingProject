const router = require('express').Router();
let Wallet = require('../models/wallets.model');

router.route('/').get((req, res) => {
  Wallet.find()
  .then(wallet => res.json(wallet))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {
  Wallet.findOneAndDelete({username: req.body.username, name: req.body.name})
    .then(() => res.json('Wallet deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get-balance').get((req, res) =>{
  Wallet.findOne({username: req.body.username})
  .then(wallet => res.json(wallet.balance))
  .catch(err => res.status(400).json('Error: ' + err));
  }
)


router.route('/add').post((req, res) => {
    const username = req.body.username;
    const balance = req.body.balance;
    const inplay   = req.body.inplay;
    const name    = req.body.name;
    
    const newWallet = new Wallet({
      username,
      name,
      balance,
      inplay
    });
  
    newWallet.save()
    .then(() => res.json('Wallet added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  }); 

  //If taking money out the req.body.balance must be negative
  router.route('/deposit').post((req, res) => {
    Wallet.findOne({username: req.body.username, name: req.body.name})
      .then(wallet => {
          wallet.balance = wallet.balance + req.body.balance
  
        wallet.save()
          .then(() => res.json('Wallet updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/withdraw').post((req, res) => {
    Wallet.findOne({username: req.body.username, name: req.body.name})
      .then(wallet => {
          wallet.balance = wallet.balance - req.body.balance
  
        wallet.save()
          .then(() => res.json('Wallet updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;