'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:dnrProfile
 * @description
 * # dnrProfile
 */
angular.module('lightApp')
  .directive('dnrProfile', function ($window, $rootScope, $resource, $filter) {
    return {
      restrict: 'EA',
      scope: true,
      link: function (scope, element) {
        scope.test = '';
        element.test = '';
    
        scope.cUser = $rootScope.currentUser;
    
        var routes = {
          changeName: $resource('/api/users/changeName'),
          changePassword: $resource('/api/users/changePassword'),
        };
    
        scope.changeUsername = function() {
          var name = scope.cUser.public.name;
          var slug = $filter('slug')(name);
          var obj = {
            name: name,
            slug: slug
          };
          routes.changeName.save({}, obj ,function(data) {
            $rootScope.currentUser.public = data;
            scope.cUser.public = $rootScope.currentUser.public;
          });
        };

      },
      templateUrl: './views/profile.html'
    };
  });