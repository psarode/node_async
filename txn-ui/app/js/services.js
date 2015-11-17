angular.module('CategoryTxnApp.services', [])
  .factory('categoryTxnAPIservice', function($http) {

    var categoryTxnAPI = {};

    categoryTxnAPI.getTxnData = function() {
       console.log("gettxndata");

      return $http({
        method: 'GET', 
        url: 'http://localhost:3000/categoryTxn'
      });
    }

    return categoryTxnAPI;
  });