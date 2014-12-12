angular.module('pledgr.register', [])

.controller('RegisterController', function($scope, $window, $state, Categories, Charities) {
  console.log('instantiating controller');
  Categories.getCategories()
    .then(function(categories) {
      $scope.categories = categories;
    });

  Categories.getSubCategories()
    .then(function(subCategories) {
      $scope.subCategories = subCategories;
    });

  $scope.charity = {
    name: '',
    city: '',
    state: '',
    zip: 12345,
    email: 'contact@charity.org',
    phone: '(123)456-7890',
    category: '',
    subCategory: '',
    vetted: false
  };

  $scope.register = function() {
    Charities.register($scope.charity)
      .then(function(res) {
        $state.go('confirmation');
      });
  };

  $scope.stateAbbrevs = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
  ];

});