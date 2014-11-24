'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('ProfileCtrl', function ($scope, $rootScope, navtracker) {
    navtracker.title = 'Profile';
    navtracker.group = 'Social';

    $scope.cUser = $rootScope.currentUser;
    navtracker.title = $scope.cUser.public.name;
  });
