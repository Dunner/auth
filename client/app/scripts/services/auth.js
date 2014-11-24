'use strict';

/**
 * @ngdoc service
 * @name lightApp.auth
 * @description
 * # auth
 * Factory in the lightApp.
 */
angular.module('lightApp')
  .factory('Auth', function Auth($state, $rootScope, Session, User, $cookieStore, socket) {
    $rootScope.currentUser = $cookieStore.get('user') || null;
    $cookieStore.remove('user');

    //Tell node we're online
    if ($rootScope.currentUser !== null) {
      socket.emit('new user', {name: $rootScope.currentUser.local.email, slug: $rootScope.currentUser.local.email});
    }
    return {

      login: function(provider, user, callback) {
        var cb = callback || angular.noop;
        Session.save({
          provider: provider,
          email: user.email,
          password: user.password,
          rememberMe: user.rememberMe
        }, function(user) {
          $rootScope.currentUser = user;
          socket.emit('new user', {name: user.local.email, slug: user.local.email});
          return cb();
        }, function(err) {
          return cb(err.data);
        });
      },

      logout: function(callback) {
        var cb = callback || angular.noop;
        Session.delete(function() {
            $rootScope.currentUser = null;
            socket.disconnect();
            return cb();
          },
          function(err) {
            return cb(err.data);
          });
      },

      createUser: function(userinfo, callback) {
        var cb = callback || angular.noop;
        User.save(userinfo,
          function() {
            return cb();
          },
          function(err) {
            return cb(err.data);
          });
      },

      currentUser: function() {
        Session.get(function(user) {
          $rootScope.currentUser = user;
          console.log(user);
        });
      },

      changeName: function(email, password, name, slug, callback) {
        var cb = callback || angular.noop;
        User.update({
          email: email,
          password: password,
          name: name,
          slug: slug
        }, function() {
            console.log('name changed');
            return cb();
        }, function(err) {
            return cb(err.data);
        });
      },

      changePassword: function(email, oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;
        User.update({
          email: email,
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function() {
            console.log('password changed');
            return cb();
        }, function(err) {
            return cb(err.data);
        });
      },

      removeUser: function(email, password, callback) {
        var cb = callback || angular.noop;
        User.delete({
          email: email,
          password: password
        }, function(user) {
            console.log(user + 'removed');
            return cb();
        }, function(err) {
            return cb(err.data);
        });
      }
    };
  });