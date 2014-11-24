'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:dnrDocument
 * @description
 * # dnrDocument
 */
angular.module('lightApp')
  .directive('dnrDocument', function ($window, scroll, navtracker, $rootScope) {
    return {
      restrict: 'EA',
      scope: true,
      link: function (scope, element) {

        //Rerunable init
        function initDir() {
          scope.navtracker = navtracker;
          scope.scrolled = false;
          scope.closed = false;
          scope.navigation = false;
          var topBar = element[0].children[0],
              // navigation = element[0].children[1],
              scrollWindow = element[0].children[2];

          scope.titleNavBurger = function () {
            scope.navigation = !scope.navigation;
          };

          scope.titleNavArrow = function () {
            scope.navigation = false;
            if( scope.scrolled ) {
              scroll.scrollToY(scrollWindow, topBar, 0, 400);
            } else if ( !scope.closed ) {
              scope.closed = true;
              scope.scrolled = false;
            } else {
              scope.closed = false;
            }
          };

          angular.element(scrollWindow).bind('scroll', function() {
            if(scrollWindow.scrollTop >= 80) {
              scope.$apply(function(){
                scope.scrolled = true;
              });
            } else {
              scope.$apply(function(){
                scope.scrolled = false;
              });
            }
          });
        }

        //Pagechange
        $rootScope.$on('$stateChangeSuccess', function () {
          setTimeout(function(){
            initDir();
          },300);
        });

        //initial init
        initDir();
      }
    };
  });
