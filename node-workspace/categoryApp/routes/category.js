var express = require('express');
var router = express.Router();

var categorydata = require('../models/categorydata.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(categorydata);

 });




module.exports = router;
