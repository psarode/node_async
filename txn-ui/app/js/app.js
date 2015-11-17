angular.module('CategoryTxnApp', [
  'CategoryTxnApp.services',
  'CategoryTxnApp.controllers',
  'ngRoute',
  'angularSpinner',
  'xeditable'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/", {templateUrl: "partials/txn.html", controller: "categoryTxnAppController"});
}]);