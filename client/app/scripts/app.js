'use strict';

/**
 * @ngdoc overview
 * @name lightAppApp
 * @description
 * # lightAppApp
 *
 * Main module of the application.
 */
angular
  .module('lightApp', [
    'lightApp.TodoService',
    'lightApp.BuddyService',
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',

    'btford.socket-io'
  ])
  .run(   ['$rootScope', '$state', '$window', 'Auth', '$timeout',
  function ($rootScope,   $state,   $window,   Auth,   $timeout) {
    //Global vars
    $rootScope.API = 'http://torst1.myftp.org:80/api/';

    //Statechange
    $rootScope.$on('$stateChangeStart', function () {
      $window.scrollTo(0, 0);
    });
    $rootScope.$on('$stateChangeSuccess', function () {
      $window.scrollTo(0, 0);
    });
    $rootScope.$on('$stateChangeError', function () {
      console.log('STATE CHANGE ERROR');
    });
    $timeout(function(){
      if ($state.current.name === 'start') {
        console.log('state: '+$state.current.name);
        $state.go('signin');
      }
    },100);
    //Logout
    $rootScope.logout = function() {
      Auth.logout();
      $rootScope.currentUser = null;
      $state.go('signin');
    };

  }])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider',
  function ($locationProvider,   $stateProvider,   $urlRouterProvider,   $httpProvider) {
    // State Configurations //
    $httpProvider.defaults.withCredentials = true;

    $stateProvider
      .state('start', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      // Logged in
      .state('social', {
        abstract: true,
        url: '',
        templateUrl: 'views/social.html'
      })
      .state('social.overview', {
        url: '/overview',
        templateUrl: 'views/overview.html',
        controller: 'OverviewCtrl'
      })
      .state('social.users', {
        url: '/users',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .state('social.user', {
        url: '/user/{userSlug}',
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }]);