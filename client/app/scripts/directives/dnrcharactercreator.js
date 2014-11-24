/*global Snap:false */
'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:dnrCharactercreator
 * @description
 * # dnrCharactercreator
 */
angular.module('lightApp')
  .directive('dnrCharactercreator', function () {
    return function (scope, element, attrs) {
      attrs.disable = '';

      var canvas = new Snap(element[0]);
      var load = 'face_slob:#d6ad94 ears_default:#d6ad94 eyes_default:#d6ad94 iris_default:#c4caff nose_default:# mouth_default:# mustache_slob:#212121 eyebrows_default:#292929 glasses_monocleL:#38ffef';

      scope.paperdoll = {
        face: {},
        hair: {},
        ears: {},
        eyes: {},
        iris: {},
        nose: {},
        mouth: {},
        mustache: {},
        eyebrows: {},
        beard: {},
        glasses: {}
      };

      function buildCharacter(load) {
        angular.forEach(load.split(' '), function(value) {
          var slotInfo = value.split(':');
          var type = slotInfo[0].split('_')[0];
          var name = slotInfo[0].split('_')[1];
          scope.paperdoll[type].type = type;
          scope.paperdoll[type].name = name;
          scope.paperdoll[type].color = slotInfo[1];
        });
      }

      function paintCharacter(array) {
        Snap.load('data/character/combined.svg', function (image) {
          canvas.paper.clear();

          function paintE(section) {
            if (section !== undefined) {
              if (section.color !== undefined) {
                if (section.color.length > 2) {
                  var paint = image.select('#' + section.type + '_' + section.name + '_color');
                  if (paint !== null) {paint.attr({'fill': section.color});}
                }
              }
              var el = image.select('#' + section.type + '_' + section.name);
              if (el !== null) {
                el.attr({'z-index': section.zIndex});
                canvas.append(el);
              }
            }
          }

          paintE(array.ears);
          paintE(array.face);
          paintE(array.iris);
          paintE(array.eyes);
          paintE(array.mouth);
          paintE(array.mustache);
          paintE(array.beard);
          paintE(array.nose);
          paintE(array.eyebrows);
          paintE(array.glasses);
          paintE(array.hair);
        });
      }

      buildCharacter(load);
      paintCharacter(scope.paperdoll);
      scope.select = function (array) {
        scope.toEdit = [];
        for (var i = array.length - 1; i >= 0; i--) {
          if (scope.paperdoll[array[i]].name === undefined) {continue;}
          scope.toEdit.push('#' + array[i] + '_' + scope.paperdoll[array[i]].name + '_color');
        }
      };
      scope.select(['face', 'ears', 'nose']);

      scope.changeColor = function (array, color, types) {
        angular.forEach(types, function(type) {
          scope.paperdoll[type].color = color;
        });
        angular.forEach(array, function(el) {
          if (el.indexOf('__') === -1) {
            canvas.select(el).animate({'fill': color}, 100);
          }
        });
      };

      scope.updateDoll = function (option, edit, type, name) {
        if (scope.paperdoll[type].name !== undefined) {
          // var test = canvas.select('#' + type + '_' + scope.paperdoll[type].name);
          // test.stop().animate({'opacity': '0'}, 300);
          // setTimeout(function(){
          //   test.remove();
          //   scope.paperdoll[type].name = name;
          //   scope.select(scope.optionsTree[option].options[edit].select);
          //   paintCharacter(scope.paperdoll);
          //   scope.$apply();
          // },300);
          scope.paperdoll[type].name = name;
          scope.select(scope.optionsTree[option].options[edit].select);
          paintCharacter(scope.paperdoll);
        } else {
          scope.paperdoll[type].name = name;
          scope.paperdoll[type].type = type;
          scope.paperdoll[type].color = '#';
          scope.select(scope.optionsTree[option].options[edit].select);
          paintCharacter(scope.paperdoll);
        }

      };
    scope.changeEdit(scope.edit);

    };
  });
