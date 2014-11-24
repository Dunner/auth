'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:dnrSplitter
 * @description
 * # dnrSplitter
 */
angular.module('lightApp')
  .directive('dnrSplitter', function ($window) {
    return {
      restrict: 'EA',
      scope: true,
      link: function (scope, element) {

        var dragging = false,
            sideFeed = element[0].children[0],
            mainContent = element[0].children[1],
            // dragBar = sideFeed.children[2],
            dragBar = document.getElementById('dragbar'),
            winWidth = $window.innerWidth;

        angular.element(dragBar).bind('mousedown', function(e) {
          e.preventDefault();
          dragging = true;
          element.on('mousemove', function(e) {
            angular.element(sideFeed).css('width', e.pageX + 50 + 'px');
            angular.element(mainContent).css({
              'left': e.pageX + 50 + 'px',
              'width': winWidth - angular.element(sideFeed)[0].offsetWidth + 'px'
            });
          });
        });

        element.on('mouseup', function() {
          if (dragging) {
            release();
          }
        });

        function release() {
          element.unbind('mousemove');
          dragging = false;
        }

      }
    };
  });
