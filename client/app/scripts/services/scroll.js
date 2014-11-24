'use strict';

/**
 * @ngdoc service
 * @name lightApp.scroll
 * @description
 * # scroll
 * Service in the lightApp.
 */
angular.module('lightApp')
  .service('scroll', function scroll() {

    function getElementY(element) {
      if (element !== undefined) {
        var y = element.offsetTop;
        return y;
      }
    }
    function getElementX(element) {
      if (element !== undefined) {
        var x = element.offsetLeft;
        return x;
      }
    }

    this.scrollToY = function(element, to, skip, duration) {

        if ((element !== null || undefined ) && (to !== null || undefined)) {
          var start = element.scrollTop,
              stop = getElementY(to)-skip,
              change = stop - start,
              currentTime = 0,
              increment = 20;

          var animateScroll = function(){
              currentTime += increment;
              var val = Math.easeInOutQuad(currentTime, start, change, duration);
              element.scrollTop = val;
              if(currentTime < duration) {
                setTimeout(animateScroll, increment);
              }
            };
          animateScroll();
        }
      };

    this.scrollToX = function(element, to, skip, duration) {
      if ((element !== null || undefined ) && (to !== null || undefined)) {
        var start = element.scrollLeft,
            stop = getElementX(to)+skip,
            change = stop - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function(){
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollLeft = val;
            if(currentTime < duration) {
              setTimeout(animateScroll, increment);
            }
          };
        animateScroll();
      }
    };

    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d/2;
      if (t < 1) {return c/2*t*t + b;}
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };
  });
