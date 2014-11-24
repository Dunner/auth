'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:BuddiesCtrl
 * @description
 * # BuddiesCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('BuddiesCtrl', function ($scope, $rootScope, BuddyService, $q) {

    var promises = [],
        friends = $rootScope.currentUser.public.friends;

    angular.forEach(friends, function(index) {
      promises.push(
        BuddyService.get({id: index.id})
      );
    });

    $q.all(promises).then(function() {
      $scope.buddies = promises;
      // do stuff with result1, result2 ... or
      // var results = Array.prototype.slice.call(arguments);
    });

  });
