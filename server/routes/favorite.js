var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Favorite = require('../models/favorite');

router.get('/', function(req, res) {
  Favorite.find({}, function(err, favorites) {
    if(err) {
      res.sendStatus(500);
      return;
    }

    res.send(favorites);
  });
});

router.post('/', function(req, res) {
  // console.log('Request body: ' , req.body);

  var fav = new Favorite(req.body);
  fav.save(function(err) {
    if(err) {
      res.sendStatus(500);
    }

    res.sendStatus(201);
  });

});

module.exports = router;
