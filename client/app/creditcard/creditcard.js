
angular.module('pledgr.creditcard', [])

.controller('CreditCardController', function($scope, CreditCards) {
  angular.extend($scope, CreditCards);
  $scope.getCards(); 
});
