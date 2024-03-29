const router = require('express').Router();
let Exchange = require('../models/exchange.model');
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    await Exchange.find({ userId: req.user })
        .then(exchange => res.json(exchange))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/gnome-exchanges", auth, async (req, res) => {
    await Exchange.find({ userId: req.user, gnomeId: req.body.gnomeId })
        .then(exchange => res.json(exchange))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/add", auth, (req, res) => {
    const { userId, gnomeId, name, balance } = req.body;
    if (balance) {
        const newExchange = new Exchange({
            userId,
            gnomeId,
            name,
            balance,
            liability: new Number(0.0)
        });
        newExchange.save()
            .then(() => res.json('Exchange added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else {
        const newExchange = new Exchange({
            userId,
            gnomeId,
            name,
            balance: new Number(0.0),
            liability: new Number(0.0)
        });
        newExchange.save()
            .then(() => res.json('Exchange added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }

});


router.post('/deposit', async (req, res) => {
    await Exchange.findOne({ gnomeId: req.body.params.id, name: req.body.params.name })
        .then(exchange => {
            exchange.balance = exchange.balance + req.body.params.balance

            exchange.save()
                .then(() => res.json('Funds deposited to Exchange!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/withdraw', async (req, res) => {
    await Exchange.findOne({ gnomeId: req.body.params.id, name: req.body.params.name })
        .then(exchange => {
            exchange.balance = exchange.balance - req.body.params.balance

            exchange.save()
                .then(() => res.json('Funds withdrawn from Exchange!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/set-bet', async (req, res) => {
    await Exchange.findOne({ gnomeId: req.body.params.id, name: req.body.params.name })
        .then(exchange => {
            exchange.balance -= req.body.params.layAmount * (req.body.params.layOdds - 1)
            exchange.liability += req.body.params.layAmount * (req.body.params.layOdds - 1)
            exchange.liability = parseFloat(exchange.liability.toFixed(2))
            exchange.balance = parseFloat(exchange.balance.toFixed(2))

            exchange.save()
                .then(() => res.json('Exchange updated according to bet'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/bet-won', async (req, res) => {
    await Exchange.findOne({ gnomeId: req.body.params.id, name: req.body.params.name })
        .then(exchange => {
            exchange.liability -= req.body.params.layAmount * (req.body.params.layOdds - 1)
            exchange.balance += req.body.params.layAmount * (req.body.params.layOdds - 1) + req.body.params.layAmount

            exchange.liability = parseFloat(exchange.liability.toFixed(2))
            exchange.balance = parseFloat(exchange.balance.toFixed(2))

            exchange.save()
                .then(() => res.json(exchange))
                .catch(err => res.status(400).json("Error:" + err))
        })
        .catch(err => res.status(400).json("Error:" + err))
})

router.post('/bet-lost', async (req, res) => {
    await Exchange.findOne({ gnomeId: req.body.params.id, name: req.body.params.name })
        .then(exchange => {
            exchange.liability -= req.body.params.layAmount * (req.body.params.layOdds - 1)
            exchange.liability = parseFloat(exchange.liability.toFixed(2))

            exchange.save()
                .then(() => res.json(exchange))
                .catch(err => res.status(400).json("Error:" + err))
        })
        .catch(err => res.status(400).json("Error:" + err))
})

router.route('/').delete((req, res) => {
    Exchange.findOneAndDelete({ username: req.body.username, name: req.body.name })
        .then(() => res.json('Exchange deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;