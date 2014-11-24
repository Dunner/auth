// lib/routes.js

'use strict';
var middleware = require('./middleware'),
    index = require('./controllers/index'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    todos = require('./controllers/todos');

module.exports = function(app) {
  // Server API Routes

  // -------
  // Session
  // -------
  app.post('/api/session', session.login); // LOGIN
  app.delete('/api/session', session.logout); // LOGOUT
  // -------
  // Todos
  // -------
  app.param('todoId', todos.todo);
  app.post('/api/todos', todos.create);
  app.get('/api/todos', todos.query);
  app.get('/api/todos/:todoId', todos.show);
  app.put('/api/todos/:todoId', todos.update);
  app.delete('/api/todos/:todoId', todos.remove);
  // -------
  // Users
  // -------
  app.post('/api/users', users.create); // SIGNUP
  app.get('/api/users/all', users.all); // GET ALL USERS
  app.get('/api/users/single/:slug', users.single); // GET SINGLE USER
  app.get('/api/users/buddy/:id', users.buddy); // GET SINGLE BUDDY
  app.post('/api/users/changeName', users.changeName); // CHANGE NAME
  app.post('/api/users/changePassword', users.changePassword); // CHANGE PASSWORD
  app.post('/api/users/addFriend', users.addFriend); // CHANGE PASSWORD
  app.get('api/profile', middleware.auth, function(req, res) { // PROFILE
    res.send('user ' + req.user);
  });

  // -------
  // Other
  // -------
  // 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });

  // -------
  // Protected
  // -------
  app.get('/user', middleware.auth);
  app.get('/users', middleware.auth);
  app.get('/settings', middleware.auth);


  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/views/*', index.views);
  app.get('/*', middleware.setUserCookie, index.index);
};