angular.module('pledgr.factories', [])

.factory('CreditCards', function($http, $state,$window, Auth, Account) {
  Stripe.setPublishableKey("pk_test_d4qfvAGCTfij33GxuvYkZKUl");
  var token = $window.localStorage.getItem('token');
  
  var cards = {data:[]};
  var formData = {
    number: "",
    cvc: "",
    expmonth: "",
    expyear: ""
  };
  
  var getCards = function() {
    Auth.checkToken(token).then(function(status) { 
      if(status === 200) {
        $http.get('/card/get')
        .success(function (res) {
          for(var i = 0; i < res.data.length; i++) {
            cards.data.push(res.data[i]);
          }
        })
        .error(function(error,status){
          console.log(error,status);
        });
      }
      else {
        $state.go('home');
      }
    })
  };

  var addCard = function() {
     var $form = $('#payment-form');
     Stripe.card.createToken($form, 
        function (status, response) {
          if (response.error) {

          } else {
            // response contains id and card, which contains additional card details
            var token = response.id;
            Account.getUserData(token).then(function(data) {
              $http({
                url: '/card/add',
                method: "POST",
                data: {
                  user: data.username, 
                  stripeToken: token,
                  endingDigits: formData.number.slice(-4),
                  exp: (formData.expmonth 
                      + '/' + formData.expyear)
                },
                headers: {'Content-Type': 'application/json'}
              })
              .then(function (res) {
                  if(res.data === "SUCCESS") {
                    cards.data.push({endingDigits: formData.number.slice(-4), exp: formData.expmonth 
                      + '/' + formData.expyear});
                  }
              });
            });

            $form.get(0).reset();
          }
        }
     ); 
  };

  var deleteCard = function(card) {
    Account.getUserData(token).then(function(data) {
      $http({
        url: '/card/delete',
        method: "POST",
        data: {user: data.username, endingDigits: card.endingDigits},
        headers: {'Content-Type': 'application/json'}
      })
      .then(function (res) {
        console.log(res);
        if(res.data === "SUCCESS") {
          for(var i = 0; i < cards.data.length; i++) {
            if(cards.data[i].endingDigits === card.endingDigits) {
              cards.data.splice(i, 1);
            }
          }
        }
      });
    });      
  }

  return {
    getCards: getCards,
    addCard: addCard,
    deleteCard: deleteCard,
    formData: formData,
    cards: cards
  }
})


.factory('Account', function($http) {
  var getUserData = function(token) {
    return $http({
      method: 'GET',
      url: '/api/users/account',
      headers: {
        'x-access-token': token
      }
    })
    .then(function(data) {
      return data
    });
  };

  return {
    getUserData: getUserData
  }
})

.factory('Auth', function($http, $state) {
  var signup = function(data) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: data
    })
    .then(function(resp) {
      return resp.data.token;
    });
  };

  var checkToken = function(token) {
    return $http({
      method: 'GET',
      url: '/api/users/signedin',
      headers: {
        'x-access-token': token
      }
    })
    .then(function(resp) {
      return resp.status;
    });
  };

  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function(resp) {
      return resp.data;
      // return resp.data.token;
    });
  };

  return {
    signup: signup,
    signin: signin,
    checkToken: checkToken
  };
})

.factory('SMS', function($http) {
  var sendCode = function(data) {
    return $http({
      method: 'POST',
      url: '/api/sms/send',
      data: data
    })
    .then(function(resp) {
      return resp.data.sent;
    });
  };

  var verifyCode = function(data) {
    return $http({
      method: 'POST',
      url: '/api/sms/verify',
      data: data
    })
    .then(function(resp) {
      return resp.data.found;
    });
  };

  return {
    sendCode: sendCode,
    verifyCode: verifyCode
  };
})

.factory('Categories', function($http) {
  var getCategories = function() {
    return $http({
      method: 'GET',
      url: '/api/charity/category'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var getSubCategories = function() {
    return $http({
      method: 'GET',
      url: '/api/charity/subCategory'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return {
    getCategories: getCategories,
    getSubCategories: getSubCategories
  };
})

.factory('Charities', function($http) {
  var register = function(data) {
    return $http({
      method: 'POST',
      url: '/api/charity',
      data: data
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var getUnvetted = function() {
    return $http({
      method: 'GET',
      url: '/api/charity/unvetted'
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var vet = function(charity) {
    return $http({
      method: 'PUT',
      url: '/api/charity',
      data: charity
    })
    .then(function(resp) {
      console.log(resp.data);
      return resp.data;
    });
  };

  return {
    register: register,
    getUnvetted: getUnvetted,
    vet: vet
  };
});
