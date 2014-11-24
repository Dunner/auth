'use strict';

/**
 * @ngdoc function
 * @name lightAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lightAppApp
 */
angular.module('lightApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
