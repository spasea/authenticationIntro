var express = require('express');
var router = express.Router();
var User = require('../models/user');


// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});

// GET route after registering
router.get('/register', function (req, res, next) {
  return res.send('GET registered');
});

//POST route for updating data
router.post('/', function (req, res, next) {
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/profile');
      }
    });

  } else {
    var err = new Error('Alle field have to be filled out');
    err.status = 400;
    return next(err);
  }

  // confirm that user typed same password twice
  if (req.body.password !== req.body.confirmPassword) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    return next(err);
  }
});

// POST route after registering
router.post('/register', function (req, res, next) {
  return res.send('POST registered');
});


module.exports = router;