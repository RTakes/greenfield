
angular.module('pledgr.creditcard', [])

.controller('CreditCardController', function($scope, $http) {
  Stripe.setPublishableKey("pk_test_d4qfvAGCTfij33GxuvYkZKUl");
  $scope.cards = [];
  $scope.formData = {
    number: "",
    cvc: "",
    expmonth: "",
    expyear: ""
  };
  $scope.getCards = function() {
    $http.get('/card/get')
    .success(function (res) {
      for(var i = 0; i < res.data.length; i++) {
          $scope.cards.push(res.data[i]);
      } 
    })
    .error(function(error,status){
      console.log(error,status);
    });
  };
  $scope.getCards();

  $scope.addCard = function() {
     var $form = $('#payment-form');
     Stripe.card.createToken($form, 
        function (status, response) {
          if (response.error) {

          } else {
            // response contains id and card, which contains additional card details
            var token = response.id;
            $http({
              url: '/card/add',
              method: "POST",
              data: {
                user: 'jsakdfj@hackreactor.com', 
                stripeToken: token,
                endingDigits: $scope.formData.number.slice(-4),
                exp: ($scope.formData.expmonth 
                    + '/' + $scope.formData.expyear)
              },
              headers: {'Content-Type': 'application/json'}
            })
            .then(function (res) {
                  console.log(res.data);
                if(res.data === "SUCCESS") {
                  $scope.cards.push({endingDigits: $scope.formData.number.slice(-4), exp: $scope.formData.expmonth 
                    + '/' + $scope.formData.expyear});
                }
            });

            $form.get(0).reset();
          }
        }
     ); 
  };

  $scope.deleteCard = function(card) {
    $http({
      url: '/card/delete',
      method: "POST",
      data: {user: 'jsakdfj@hackreactor.com', endingDigits: card.endingDigits},
      headers: {'Content-Type': 'application/json'}
    })
    .then(function (res) {
      console.log(res);
      if(res.data === "SUCCESS") {
        for(var i = 0; i < $scope.cards.length; i++) {
          if($scope.cards[i].endingDigits === card.endingDigits) {
            $scope.cards.splice(i, 1);
          }
        }
      }
    });      
  }

});
