var express = require('express');
var router = express.Router();

var categoryTxnService = require('../service/categoryTxnService');

/* GET txn listing. */
router.get('/', function(req, res, next) {
   console.log("Here in WF Controller app");
    categoryTxnService.getCategorizedTransaction(req,res,function(err,result){

      res.json(result);
    });

 });

module.exports = router;
