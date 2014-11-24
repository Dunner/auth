'use strict';

/**
 * @ngdoc directive
 * @name lightApp.directive:dnrChat
 * @description
 * # dnrChat
 */
angular.module('lightApp')
  .directive('dnrChat', function ($window, TodoService, socket, $filter) {
    return {
      restrict: 'EA',
      scope: true,
      link: function (scope, element) {
        scope.test = '';
        element.test = '';
    
        
        TodoService.query(function(response) {
          scope.todos = response;
        });
        
        scope.addTodo = function(todo) {
          var newTodo = new TodoService({
            title: todo,
            completed: false
          });
          newTodo.$save();
          socket.emit('new globalchat', newTodo);
          scope.newTodo = '';
        };
        
        socket.on('new globalchat', function(data){
         scope.$apply(function(){
            //This requires testing, no Z in timestamp
            data.createdAt = $filter('date')(data.createdAt, 'yyyy-MM-ddTHH:mm:ss');
            scope.todos.push(data);
          });
        });


      },
      templateUrl: './views/chat.html'
    };
  });