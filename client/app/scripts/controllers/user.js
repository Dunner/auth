'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('UserCtrl', function ($scope, $resource, $stateParams) {

    var routes = {
      users: $resource('/api/users/single/:slug', {slug: '@slug'}),
      addFriend: $resource('/api/users/addFriend'),
    },
    userSlug = $stateParams.userSlug;

    routes.users.get({slug: userSlug}, function(data) {
      $scope.user = data;
    });

    $scope.addFriend = function () {
      routes.addFriend.save({}, {slug: userSlug}, function(data) {
        console.log(data);
      });
    };

  });