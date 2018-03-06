var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.DB_URI);
var userData = db.get('user-data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {items: []});
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  userData.find({}).then(function(docs) {
    res.render('index', {items: docs});
  });
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  userData.insert(item, function(err){
    res.redirect('/get-data');
  });

});

router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  userData.update(id, item, function(err){
    res.redirect('/get-data');
  });
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  userData.remove(id, function(err){
    res.redirect('/get-data');
  });
});

module.exports = router;
