/*global Hamster:false */
'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:dnrChatscroll
 * @description
 * # dnrChatscroll
 */
angular.module('lightApp')
  .directive('dnrChatscroll', function ($window, scroll) {
    return {
      restrict: 'EA',
      scope: true,
      link: function (scope, element) {

        var Vlelems, nextY, last,
          notches = 0,
          scrollDiv = element[0].children[1],
          scrollBar = element[0].children[0],
          win = angular.element($window),
          winHeight = $window.innerHeight,
          winWidth = $window.innerWidth;
        scope.currentIdY = 0;

        function init() {
          Vlelems = scrollDiv.children;
          notches = 100 / Vlelems.length;
          updateScroll();
        }

        function reScale() {
          winHeight = $window.innerHeight;
          winWidth = $window.innerWidth;
          init();
        }

        scope.$watch(
          function () { return scrollDiv.children.length; },
          function (newValue, oldValue) {
            if (newValue !== oldValue) {
              //new item
              Vlelems = scrollDiv.children;
              last = angular.element(Vlelems[Vlelems.length - 1]);
              scroll.scrollToY(scrollDiv, last[0], 0, 200);
              scope.currentIdY = Vlelems.length - 1;
              init();
            }
          }
        );

        win.bind('resize', function () {reScale();});

        function updateScroll() {
          angular.element(scrollBar).css({
            'top': scope.currentIdY * notches + '%',
            'height': notches + '%'
          });
          for (var i = Vlelems.length - 1; i >= 0; i--) {
            angular.element(Vlelems[i]).css({
              'border-left-width': '0px'
            });
          }
          angular.element(Vlelems[scope.currentIdY]).css({
            'border-left-width': '10px'
          });
        }

        setTimeout(function(){init();},300);

        scope.up = function () {
          if (scope.currentIdY === 0) {return;/*scope.currentIdY = Vlelems.length;*/}
          nextY = angular.element(Vlelems[scope.currentIdY-1]);
          scope.currentIdY = scope.currentIdY-1;
          scroll.scrollToY(scrollDiv, nextY[0], 0, 200);
          updateScroll();
        };

        scope.down = function () {
          if (scope.currentIdY===Vlelems.length-1) {return; /*scope.currentIdY = -1;*/}
          nextY = angular.element(Vlelems[scope.currentIdY+1]);
          scope.currentIdY = scope.currentIdY+1;
          scroll.scrollToY(scrollDiv, nextY[0], 0, 200);
          updateScroll();
        };

        scope.specificY = function (id) {
          nextY = angular.element(Vlelems[id]);
          scope.currentIdY = id;
          scroll.scrollToY(scrollDiv, nextY[0], 0, 200);
          updateScroll();
        };

        scope.jumpOne = function () {
          setTimeout(function(){
            nextY = angular.element(Vlelems[1]);
            scope.currentIdY = 1;
            scroll.scrollToY(scrollDiv, nextY[0], 0, 200);
            updateScroll();
          },500);
        };

        if(typeof Hamster !== undefined) {
          new Hamster(element[0]).wheel(function(event, delta){
            event.preventDefault();
            if(delta>0) {
              scope.up();
            }
            else {
              scope.down();
            }
          });
        }

      }
    };
  });

