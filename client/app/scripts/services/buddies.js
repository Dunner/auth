'use strict';

/**
 * @ngdoc service
 * @name lightApp.buddies
 * @description
 * # buddies
 * Service in the lightApp.
 */
angular.module('lightApp.BuddyService', [])
  .service('BuddyService', ['$resource', function($resource) {

    return $resource('api/users/buddy/:id', {
      id: '@id'
    });

  }]);