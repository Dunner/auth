'use strict';

/**
 * @ngdoc service
 * @name lightApp.TodoService
 * @description
 * # TodoService
 * Service in the lightApp.
 */
angular.module('lightApp.TodoService', [])
  .service('TodoService', ['$rootScope', '$resource', function($rootScope, $resource) {

    return $resource('api/todos/:todoId', {
      todoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

  }]);