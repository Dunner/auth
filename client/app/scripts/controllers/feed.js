'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('FeedCtrl', function ($scope) {
    $scope.activeFeed = 'news';

    $scope.changeFeed = function (feed) {
      $scope.activeFeed = feed;
    };

  });
