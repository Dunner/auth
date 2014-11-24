'use strict';

/**
 * @ngdoc function
 * @name lightApp.controller:TodoCtrl
 * @description
 * # TodoCtrl
 * Controller of the lightApp
 */
angular.module('lightApp')
  .controller('TodoCtrl', ['$scope', 'TodoService', 'socket', '$filter', function ($scope, TodoService, socket, $filter) {

    TodoService.query(function(response) {
      $scope.todos = response;
    });

    $scope.addTodo = function(todo) {
      var newTodo = new TodoService({
        title: todo,
        completed: false
      });
      newTodo.$save();
      socket.emit('new globalchat', newTodo);
      $scope.newTodo = '';
    };

    socket.on('new globalchat', function(data){
      $scope.$apply(function(){
        //This requires testing, no Z in timestamp
        data.createdAt = $filter('date')(data.createdAt, 'yyyy-MM-ddTHH:mm:ss');
        $scope.todos.push(data);
      });
    });


  }]);
