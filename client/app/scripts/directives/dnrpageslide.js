/*global Hamster:false */
'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:dnrPageslide
 * @description
 * # dnrPageslide
 */
angular.module('lightApp')
  .directive('dnrPageslide', function ($window, scroll) {
    return {
      restrict: 'EA',
      scope: true,
      link: function (scope, element) {

        var Vlelems, currentY, nextY,
          currentId = 0,
          currentIdY = 0,
          scrolling = false,
          win = angular.element($window),
          winHeight = $window.innerHeight,
          winWidth = $window.innerWidth;
        scope.currentIdY = currentIdY;

        function init() {
          Vlelems = document.getElementsByClassName('full-slide');
          if (Vlelems !== undefined || null) {
            for (var i = Vlelems.length - 1; i >= 0; i--) {
              Vlelems[i].style.height = winHeight + 'px';
            }
          }
        }
        init();

        function reScale() {
          winHeight = $window.innerHeight;
          winWidth = $window.innerWidth;
          init();
        }

        // scope.$watch('items', function(newValue, oldValue) {});


        scope.currentId = currentId;
        scope.currentIdY = currentIdY;
        win.bind('resize', function () {reScale();});

        scope.up = function () {
          if (currentIdY === 0) {return /*currentIdY = Vlelems.length*/;}
          currentY = angular.element(Vlelems[currentIdY]);
          nextY = angular.element(Vlelems[currentIdY-1]);
          currentIdY = currentIdY-1;
          scope.currentIdY = currentIdY;
          scroll.scrollToY(element[0], nextY[0], 0, 400);
          currentId = -1;
        };

        scope.down = function () {
          if (currentIdY===Vlelems.length-1) {return /*currentIdY = -1*/;}
          currentY = angular.element(Vlelems[currentIdY]);
          nextY = angular.element(Vlelems[currentIdY+1]);
          currentIdY = currentIdY+1;
          scope.currentIdY = currentIdY;
          scroll.scrollToY(element[0], nextY[0], 0, 400);
          currentId = -1;
        };


        scope.specificY = function (id) {
          currentY = angular.element(Vlelems[currentIdY]);
          nextY = angular.element(Vlelems[id]);
          currentIdY = id;
          scope.currentIdY = currentIdY;
          scroll.scrollToY(element[0], nextY[0], 0, 400);
        };

        scope.jumpOne = function () {
          setTimeout(function(){
            nextY = angular.element(Vlelems[1]);
            currentIdY = 1;
            scope.currentIdY = 1;
            scroll.scrollToY(element[0], nextY[0], 0, 400);
          },500);
        };


        if(typeof Hamster !== undefined) {
          new Hamster(element[0]).wheel(function(event, delta){
            event.preventDefault();
            if (!scrolling) {
              if(delta>0) {
                scope.up();
              }
              else {
                scope.down();
              }
              scrolling = true;
              setTimeout(function(){scope.$apply(); scrolling=false;},300);
            }
          });
        }

      }
    };
  });
