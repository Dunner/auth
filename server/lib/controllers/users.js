'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

/**
 * Create user
 */

exports.create = function (req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      //req.session.messages =  [info.message];
      return res.redirect('/login');
    }
    res.json(req.user);
  })(req, res, next);
};

/**
 * Get all users
 */

exports.all = function(req, res, next) {
  var userArray = [];
  if (req.isAuthenticated()) {
    User.find(function (err, users) {
      if (err) return res.send(400);
      users.forEach(function(elem, index, array) {
        userArray.push(elem.public);
      });
      res.json(userArray);
    });
  } else {
    res.send(403);
  }
};


exports.single = function(req, res, next) {
  if (req.isAuthenticated()) {
    User.findOne({
      'public.slug': req.params.slug
    }, function (err, user) {
      if (err) return res.send(400);
      res.json(user.public);
    });
  } else {
    res.send(403);
  }
};

exports.buddy = function(req, res, next) {
  if (req.isAuthenticated()) {
    User.findOne({
      '_id': req.params.id
    }, function (err, user) {
      if (err) return res.send(400);
      res.json(user.public);
    });
  } else {
    res.send(403);
  }
};

/**
 * Change name
 */

exports.changeName = function(req, res, next) {
  var name = String(req.body.name);
  var slug = String(req.body.slug);
  if (req.isAuthenticated()) {
    User.findOne({
      'local.email': req.user.local.email
    }, function (err, user) {
      user.public.name = name;
      user.public.slug = slug;
      user.save(function(err) {
        if (err) return res.send(400);
        res.json(user.public);
      });
    });
  } else {
    res.send(403);
  }
};


/**
 * Change name
 */

exports.changePassword = function(req, res, next) {
  var name = String(req.body.name);
  var slug = String(req.body.slug);
  if (req.isAuthenticated()) {
    User.findOne({
      'local.email': req.user.local.email
    }, function (err, user) {
      user.public.name = name;
      user.public.slug = name;
      user.save(function(err) {
        if (err) return res.send(400);
        res.json(req.user.public);
      });
    });
  } else {
    res.send(403);
  }
};

/**
 * Change name
 */

exports.addFriend = function(req, res, next) {
  var slug = String(req.body.slug);
  if (req.isAuthenticated()) {
    User.findOne({
      'public.slug': slug
    }, function (err, friend) {
      if (err) return res.send(400);

      User.findOne({
        'local.email': req.user.local.email
      }, function (err, user) {
        var responseIx = user.public.friends.push({'id': friend._id}) - 1;

        user.save(function(err, friends){
          if(err) { console.log(err); return res.send(400); }
          return res.send('worked');
        });
      });

    });
  } else {
    res.send(403);
  }
};