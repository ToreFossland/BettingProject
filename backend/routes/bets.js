
const router = require('express').Router();
let Bet = require('../models/bet.model');

router.route('/').get((req, res) => {
  Bet.find()
    .then(bets => res.json(bets))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const username = req.body.username;
  const placeDate = Date.parse(req.body.placeDate);
  const betDate = Date.parse(req.body.betDate);
  const event = req.body.event;
  const backOdds = Number(req.body.backOdds);
  const layOdds = Number(req.body.layOdds);
  const backAmount = Number(req.body.backAmount);
  const layAmount = Number(req.body.layAmount);
  const bookie = req.body.bookie;
  const exchange = req.body.exchange;
  const commission = Number(req.body.commission);
  const sport = req.body.sport;
  const freebet = req.body.freebet;
  const outcome = req.body.outcome;
  
  const newBet= new Bet({
    username,
    placeDate,
    betDate,
    event,
    backOdds,
    layOdds,
    backAmount,
    layAmount,
    bookie,
    exchange,
    commission,
    sport,
    freebet,
    outcome,
  });

  newBet.save()
  .then(() => res.json('Bet added!'))
  .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/user-bets').get((req, res) => {
  Bet.find({username: req.body.username})
    .then(bet => res.json(bet))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Bet.findByIdAndDelete(req.params.id)
    .then(() => res.json('Bet deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Bet.findById(req.params.id)
    .then(bet => {
      bet.username = req.body.username;
      bet.placeDate = Date.parse(req.body.placeDate);
      bet.betDate = Date.parse(req.body.betDate);
      bet.event = req.body.event;
      bet.backOdds = Number(req.body.backOdds);
      bet.layOdds = Number(req.body.layOdds);
      bet.backAmount = Number(req.body.backAmount);
      bet.layAmount = Number(req.body.layAmount);
      bet.bookie = req.body.bookie;
      bet.exchange = req.body.exchange;
      bet.commission = Number(req.body.commission);
      bet.sport = req.body.sport;
      bet.freebet = req.body.freebet;
      bet.outcome = req.body.outcome;

      bet.save()
        .then(() => res.json('Bet updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/bets-month').get((req, res) => {
  Bet.find({'betDate':{
        $gte: req.body.start,
        $lte: req.body.end
  } })
    .then(bet => res.json(bet))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;