
const router = require('express').Router();
let Bet = require('../models/bet.model');
const auth = require("../middleware/auth");
const moment = require('moment')

router.get("/", auth, async (req, res) => {
  const bet = await Bet.find({ userId: req.user })
  res.json(
    bet
  );
});

router.get("/gnome-bets", auth, async (req, res) => {
  const bet = await Bet.find({ gnomeId: req.body.gnomeId })
  res.json(
    bet
  )
})

router.post("/add", auth, async (req, res) => {
  const existingUser = await User.findById(req.user);
  if (!existingUser) {
    return res
      .status(401)
      .json({ msg: "Cannot find user with id, authorization denied" });
  }
  const formattedBetDate = moment(req.body.betDate).format('YYYY-MM-DD HH:mm:ss')
  const userId = req.body.userId;
  const gnomeId = req.body.gnomeId;
  const betDate = formattedBetDate;
  const homeTeam = req.body.homeTeam;
  const awayTeam = req.body.awayTeam;
  const event = req.body.event;
  const eventType = req.body.eventType;
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
  const settled = req.body.settled;
  const didWin = req.body.didWin;
  const overUnder = req.body.overUnder;

  const newBet = new Bet({
    userId,
    gnomeId,
    betDate,
    homeTeam,
    awayTeam,
    event,
    eventType,
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
    settled,
    didWin,
    overUnder
  });

  newBet.save()
    .then(() => res.json('Bet added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/settle-result', async (req, res) => {
  await Bet.findById(req.body.params.id)
    .then(bet => {
      bet.settled = true;
      bet.didWin = req.body.params.didWin;

      bet.save()
        .then(() => res.json("Bet settled"))
        .catch(err => res.status(400).jason("Error:" + err));
    })
    .catch(err => res.status(400).json("Error" + err))
})


router.get('/todays-bets', auth, async (req, res) => {
  let today = new Date().toISOString().slice(0, 10)
  let tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  await Bet.find({
    'betDate': {
      $gte: today,
      $lte: tomorrow
    }
  })
    .then(bet => res.json(bet))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.get('/unsettled-bets', auth, async (req, res) => {
  let today = new Date().toISOString().slice(0, 10)
  await Bet.find({
    'betDate': {
      $lt: today,
    },
    'settled': false
  })
    .then(bet => res.json(bet))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', (req, res) => {
  Bet.findById(req.params.id)
    .then(bet => {
      bet.userId = req.body.username;
      bet.betDate = Date.parse(req.body.betDate);
      bet.homeTeam = req.body.homeTeam;
      bet.awayTeam = req.body.awayTeam;
      bet.event = req.body.event;
      bet.eventType = req.body.eventType;
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
      bet.settled = req.body.settled;
      bet.overUnder = req.body.overUnder;

      bet.save()
        .then(() => res.json('Bet updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
  Bet.findByIdAndDelete(req.params.id)
    .then(() => res.json('Bet deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;