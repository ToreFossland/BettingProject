const router = require('express').Router();
let Bookie = require('../models/bookie.model');

router.route('/').get((req, res) => {
  Bookie.find()
  .then(bookie => res.json(bookie))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {
  Bookie.findOneAndDelete({username: req.body.username, name: req.body.name})
    .then(() => res.json('Bookie deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get-balance').get((req, res) =>{
  Bookie.findOne({username: req.body.username})
  .then(bookie => res.json(bookie.balance))
  .catch(err => res.status(400).json('Error: ' + err));
  }
)

router.route('/get-inplay/').get((req, res) =>{
  Bookie.findOne({username: req.body.username})
  .then(bookie => res.json(bookie.inplay))
  .catch(err => res.status(400).json('Error: ' + err));
  }
)


router.route('/add').post((req, res) => {
    const username = req.body.username;
    const balance = req.body.balance;
    const inplay   = req.body.inplay;
    const name    = req.body.name;
    
    const newBookie = new Bookie({
      username,
      name,
      balance,
      inplay
    });
  
    newBookie.save()
    .then(() => res.json('Bookie added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  }); 

  //If taking money out the req.body.balance must be negative
  router.route('/update-balance').post((req, res) => {
    Bookie.findOne({username: req.body.username, name: req.body.name})
      .then(bookie => {
          bookie.balance = bookie.balance + req.body.balance
  
        bookie.save()
          .then(() => res.json('Bookie updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update-inplay/').post((req, res) => {
    Bookie.findOne({username: req.body.username, name: req.body.name})
      .then(bookie => {
          bookie.inplay = bookie.inplay + req.body.inplay
  
        bookie.save()
          .then(() => res.json('Bookie updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


  module.exports = router;