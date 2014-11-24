


module.exports = function(app, io) {

  //Socket

  var users = {};

  io.sockets.on('connection', function(socket){

    socket.on('new user', function(data){
      if (users[socket.user] === data.name) return;
      if (data.name === 'undefined') return;
      socket.user = data.name;
      socket.slug = data.slug;
      users[socket.user] = socket;
      updateUsers();
      console.log(data.name+' Logged in.');
    });

    socket.on('new topic', function(data){
      io.sockets.emit('new topic', data);
    });

    socket.on('new news', function(data){
      io.sockets.emit('new news', data);
    });

    socket.on('new globalchat', function(data){
      data.createdAt = Date.now();
      io.sockets.emit('new globalchat', data);
    });

    socket.on('new privatechat', function(data){
      var to = data.to;
      to = to.replace(/-/g, ' ');

      if(data.by in users){
        users[data.by].emit('new privatechat', data);
      }
      if(to in users){
        users[to].emit('new privatechat', data);
      }
    });

    socket.on('userlist', function(data){
      io.sockets.emit('userlist', Object.keys(users));
    });

    function updateUsers(name){

      function userWslug(cb) {
        var activeusers = [];
        var activenumber = 0;
        for(var key in cb) {
            activeusers.push({name: key, slug: cb[key].slug});
            activenumber++;
        }
        return activeusers;
      }

      io.sockets.emit('usernames', userWslug(users));
    }

    socket.on('logout', function(data){
      if(!data) return;
      delete users[socket.user];
      updateUsers();
      console.log(data+' logged out.');
    });

    socket.on('disconnect', function(data){
      if(!socket.user) return;
      delete users[socket.user];
      updateUsers();
      console.log(socket.user+' logged out.');
    });

  });

};