
angular.module('CategoryTxnApp.controllers', []).run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});


angular.module('CategoryTxnApp.controllers', []).controller('categoryTxnAppController',['$scope', '$routeParams','categoryTxnAPIservice','usSpinnerService', '$filter',
  function ($scope,$routeParams,categoryTxnAPIservice, usSpinnerService, $filter) {

    $scope.id = $routeParams.id;
    $scope.transactionList = [];
    $scope.loading = true;
    $scope.transaction =
    {
      selectedCategory : 1
    };


   $scope.getTransactionData = function () {

         
         categoryTxnAPIservice.getTxnData().success(function (response) {
             console.log("response"+ JSON.stringify(response));
             $scope.transactionList = response; 
             $scope.loading = false;
             //$scope.stopSpin();
             usSpinnerService.stop();
        }); 
    }();

    $scope.categories = [
    {value: 1, text: 'Select'},
    {value: 2, text: 'Auto'},
    {value: 3, text: 'Bank Fee'},
    {value: 4, text: 'Cash'},
    {value: 5, text: 'Charity'},
    {value: 6, text: 'Childcare'},
    {value: 7, text: 'Credit Card'},
    {value: 8, text: 'Dining'},
    {value: 9, text: 'Education'}
  ]; 

  $scope.showCategory = function() {
    console.log("$scope.selectedCategory :"+$scope.transaction.selectedCategory);
    var selected = $filter('filter')($scope.categories, {value: $scope.transaction.selectedCategory});
    console.log("selected :"+ JSON.stringify(selected));
 
    return ($scope.transaction.selectedCategory && selected.length) ? selected[0].text : 'Not set';
  };

  
}]);

  
    