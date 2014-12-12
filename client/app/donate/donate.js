angular.module('pledgr.donate', [])

.controller('DonateController', function($scope, $http, $stateParams) {
  $scope.id = $stateParams.id;
    $http.get('/api/charity/' + $scope.id)
      .success(function(data) {
        $scope.charity = data;
      })
      .error(function(data, status) {
        console.log('ERROR', status, data);
      }); 
});
