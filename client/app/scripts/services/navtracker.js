'use strict';

/**
 * @ngdoc service
 * @name lightApp.navtracker
 * @description
 * # navtracker
 * Factory in the lightApp.
 */
angular.module('lightApp')
  .factory('navtracker', function () {

    var navInfo = {
      title:'',
      group:''
    };

    return navInfo;

  });
