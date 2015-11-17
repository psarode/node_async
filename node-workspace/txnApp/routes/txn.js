var express = require('express');
var router = express.Router();

var txn = require('../models/txndata.json');

/* GET users listing. */
router.get('/', function(req, res, next) {

sleep(1000, function() {
   // executes after one second, and blocks the thread
});
  res.json(txn);

 });

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}


module.exports = router;
