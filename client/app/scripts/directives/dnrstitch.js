'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:dnrStitch
 * @description
 * # dnrStitch
 */
angular.module('lightApp')
  .directive('dnrStitch', function () {
    return {
      restrict: 'EA',
      scope: true,
      link: function postLink(scope, element) {

        scope = '';
        element = '';
        // // Init
        // $timeout(function() {
        //   var eH = angular.element(element[0])[0].offsetHeight;
        //   var eW = angular.element(element[0])[0].offsetWidth;
        //   var eS = eH * eW;
        //   var aS = eH * eW;
        //   var stitches = '';
        //   var newStitch = '';
        //   var oldStitch = '';
        //   var temp = {};
        //   var sBiggest = 0;
        //   var sSmallest = 0;
        //   scope.elems = [];

        //   function getOffset( el ) {
        //       var _x = 0;
        //       var _y = 0;
        //       while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        //           _x += el.offsetLeft - el.scrollLeft;
        //           _y += el.offsetTop - el.scrollTop;
        //           el = el.offsetParent;
        //       }
        //       return { top: _y, left: _x };
        //   }

        //   scope.add = function () {

        //     scope.elems.push({id:scope.elems.length});
        //     $timeout(function() {
        //       stitches = document.getElementsByClassName('stitch');
        //       newStitch = stitches[scope.elems.length-1];
        //       var random = Math.floor(Math.random() * scope.elems.length);
        //       console.log(random);
        //       oldStitch = stitches[random];
        //       for (var i = stitches.length - 1; i >= 0; i--) {
        //         temp.size = angular.element(stitches[i])[0].offsetHeight * angular.element(stitches[i])[0].offsetWidth;
        //         if (temp.size < sSmallest) {
        //           sSmallest = angular.element(stitches[i])[0].offsetHeight * angular.element(stitches[i])[0].offsetWidth;
        //         } else if (temp.size > sBiggest){
        //           sBiggest = angular.element(stitches[i])[0].offsetHeight * angular.element(stitches[i])[0].offsetWidth;
        //         }
        //       };
        //       if (aS > 0) {
        //         angular.element(newStitch).css({
        //           'width': eW / 2 + 'px',
        //           'height': eH / 2 + 'px',
        //           'background': 'white'
        //         });
        //         aS -= angular.element(newStitch)[0].offsetHeight * angular.element(newStitch)[0].offsetWidth;
        //         console.log(aS, eS);
        //       } else
        //       {
        //         angular.element(oldStitch).css({
        //           'width': angular.element(oldStitch)[0].clientWidth / 2 + 'px',
        //           'height': angular.element(oldStitch)[0].clientHeight / 2 + 'px',
        //           'background': 'white'
        //         });
        //         aS += ((angular.element(oldStitch)[0].clientWidth / 2) * (angular.element(oldStitch)[0].clientHeight / 2))
        //       }
        //     }, 300);

        //   };

        // }, 300);

      }
    };
  });
