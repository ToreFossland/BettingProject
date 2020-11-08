const router = require('express').Router();
const { raw } = require('express');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const gnome = [{username:req.body.username}];

  const newUser = new User({username: username, gnomes: gnome});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
  User.findOne({username: req.body.username})
    .then(user => {
      user.username = req.body.username;
      user.gnomes.push({username:req.body.gnome})

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete((req, res) => {
  User.findOneAndDelete({username: req.body.username})
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/gnomes').post((req, res) => {
  User.findOne({username: req.body.username})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;