angular.module('pledgr', [
  'pledgr.charities',
  'pledgr.factories',
  'pledgr.home',
  'pledgr.signup',
  'pledgr.signin',
  'pledgr.register',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
//.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/signin/signin.html',
      controller: 'SignInController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/signup/signup.html',
      controller: 'SignupController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'app/register/register.html',
      controller: 'RegisterController'
    })
    .state('charities', {
       url: '/charities/{c1:[0-9]+}/{c2:[0-9]+}/{c3:[0-9]+}',
       templateUrl: 'app/charities/charities.html',
       controller: 'CharitiesController'
    });

    // $httpProvider.interceptors.push('AttachTokens');
}).controller('mainApp', function($scope, $state){

  $scope.state = $state;


});
