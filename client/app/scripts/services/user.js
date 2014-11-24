'use strict';

/**
 * @ngdoc service
 * @name lightApp.user
 * @description
 * # user
 * Factory in the lightApp.
 */
angular.module('lightApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id', {
      id: '@id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
    });
  });