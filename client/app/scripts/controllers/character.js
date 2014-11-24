/*global Snap:false */
'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:CharacterCtrl
 * @description
 * # CharacterCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('CharacterCtrl', function ($scope) {

    $scope.specificColor = '#CDA184';
    $scope.option = 'face';
    $scope.edit = 'shape';
    $scope.palette = 'skintones';

    $scope.changeOption = function(option) {
      $scope.option = option;
      $scope.changeEdit($scope.optionsTree[option].defaultOption);
    };
    $scope.changeEdit = function(option) {
      $scope.edit = option;
      $scope.palette = $scope.optionsTree[$scope.option].options[$scope.edit].palette;
      $scope.select($scope.optionsTree[$scope.option].options[$scope.edit].select);
      $scope.changeEditUpdate();
    };

    $scope.changeEditUpdate = function () {
      $scope.inventoryOption = $scope.optionsTree[$scope.option].options[$scope.edit].select;
      Snap.load('data/character/combined.svg', function (image) {
        $scope.inventory = image.selectAll('g[inkscape\\:label="#'+$scope.inventoryOption[0]+'"]').items;
        for (var i = $scope.inventory.length - 1; i >= 0; i--) {
          var name = $scope.inventory[i].node.id.split('_');
          $scope.inventory[i].name = name[1];
        }
        $scope.$apply();
      });
    };

    $scope.$watch(
      function( $scope ) {
        return( $scope.specificColor );
      }, function( color ) {
        if (color !== '#CDA184') {
          $scope.changeColor($scope.toEdit, color, $scope.inventoryOption);
        }
      }
    );

    $scope.save = function() {
      var protLoad = [];
      angular.forEach($scope.paperdoll, function(part) {
        if (part.name !== undefined &&
            part.color !== undefined &&
            part.type !== undefined) {
          protLoad.push(part.type+'_'+part.name+':'+part.color);
        }
      });
      var load = protLoad.join(' ');
      console.log(load);
    };

    $scope.colors = {
      'skintones': [
        'rgb(240, 199, 177)',
        'rgb(243, 212, 207)',
        'rgb(255, 208, 188)',
        'rgb(217, 184, 175)',
        'rgb(217, 164, 148)',
        'rgb(233, 185, 149)',
        'rgb(245, 175, 149)',
        'rgb(225, 158, 149)',
        'rgb(218, 164, 136)',
        'rgb(242, 170, 146)',
        'rgb(236, 196, 184)',
        'rgb(246, 228, 226)',
        'rgb(238, 170, 131)',
        'rgb(205, 161, 132)'],
      'makeup': [
        'rgb(169, 0, 148)'],
      'haircolors': [
        'rgb(77, 31, 31)'],
      'eyes': [
        'rgb(16, 122, 168)']
    };

    $scope.optionsTree = {
      'face':{
        'index': 1,
        'defaultOption': 'shape',
        'options':{
          'shape': {
            'index': 1,
            'removeable': false,
            'select': ['face', 'ears', 'eyes'],
            'palette':'skintones'},
          'mouth': {
            'index': 2,
            'removeable': false,
            'select': ['mouth'],
            'palette':'skintones'},
          'nose': {
            'index': 3,
            'removeable': false,
            'select': ['nose', 'face', 'ears', 'eyes'],
            'palette':'skintones'},
          'ears': {
            'index': 4,
            'removeable': false,
            'select': ['ears', 'face', 'eyes'],
            'palette':'skintones'}}},
      'hair':{
        'index': 2,
        'defaultOption': 'hairstyle',
        'options':{
          'hairstyle': {
            'index': 1,
            'removeable': true,
            'select': ['hair'],
            'palette':'skintones'},
          'mustache': {
            'index': 2,
            'removeable': true,
            'select': ['mustache'],
            'palette':'skintones'},
          'beard': {
            'index': 3,
            'removeable': true,
            'select': ['beard'],
            'palette':'skintones'},
          'arms': {
            'index': 4,
            'removeable': true,
            'select': ['arms'],
            'palette':'skintones'}}},
      'eyes':{
        'index': 3,
        'defaultOption': 'shape',
        'options':{
          'shape': {
            'index': 1,
            'select': ['eyes'],
            'palette':'skintones'},
          'iris': {
            'index': 2,
            'select': ['iris'],
            'palette':'skintones'},
          'eyebrows': {
            'index': 3,
            'removeable': true,
            'select': ['eyebrows'],
            'palette':'skintones'},
          'glasses': {
            'index': 4,
            'removeable': true,
            'select': ['glasses'],
            'palette':'skintones'}}},
      'clothes':{'index': 4},
      // 'jewelry':{'index': 5},
      // 'scars':{'index': 6},
    };

  });
