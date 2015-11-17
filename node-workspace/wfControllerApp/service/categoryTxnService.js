var restify = require('restify');
var async = require('async'),
     _ = require('underscore');
var categoryTxnService = {};

module.exports = categoryTxnService;

categoryTxnService.getCategorizedTransaction = function(req,res, getCategorizedTransactionControllerCallBack) {
//REST call for category app
console.log("call rest client");
async.parallel({
            transactionDetails: function(prlcb) {

				var client = restify.createJsonClient({
					url: 'http://localhost:3001',
					version: '~1.0'
				});

				client.get('/txn', function (err, req, res, obj) {
					if(err){
					console.log("err:"+err);
					prlcb(err, null);
					}else{
					console.log('Server returned: %j', obj);
					prlcb(null,obj);
				    }
				});

            },
            categoryDetails: function(prlcb) {

                var client = restify.createJsonClient({
					url: 'http://localhost:3002',
					version: '~1.0'
				});

				client.get('/category', function (err, req, res, obj) {
					if(err){
					console.log("err:"+err);
					prlcb(err, null);
					}else{
					console.log('Server returned: %j', obj);
					prlcb(null,obj);
				    }
				});

            }
        }, function(err,result) {
            if (err) {
            	console.log("err result : "+ JSON.stringify(result));
                categoryTxnService.assignCategories(result, function(err, result){
					getCategorizedTransactionControllerCallBack(err, result);
				});
            } else {
            	console.log('Server returned: %j', result);

				categoryTxnService.assignCategories(result, function(err, result){
					getCategorizedTransactionControllerCallBack(err, result);
				});
                
            }
        });
};

categoryTxnService.assignCategories = function(input, assignCategoriesCallBack) {
	//REST call for category app
	console.log("assign categories");

	var err = "";
	var result = input;

	var details = [];
	var transactionDetails = result.transactionDetails;
	var categoryDetails = result.categoryDetails;
    
    //create a map 

    var categoryMap = {};
	var i = null;
	if(categoryDetails) {

		for (i = 0; categoryDetails.length > i; i += 1) {
		    categoryMap[categoryDetails[i].txnno] = categoryDetails[i];
		}
    }
    console.log("categoryMap :"+ JSON.stringify(categoryMap));

    if(transactionDetails){
        _.forEach(transactionDetails, function(value, key) {
            var temp = {};
            temp.txnno = value.txnno;
            temp.date = value.date;
            temp.description = value.description;
            temp.amount = value.amount;
            temp.charge = value.charge;
            temp.category = categoryMap[value.txnno] ? categoryMap[value.txnno].category : "";
            details.push(temp);
        });
    }


    assignCategoriesCallBack(err, details);

};

