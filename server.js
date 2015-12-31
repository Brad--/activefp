var http = require('http');
var path = require('path');
var express = require('express');
var io = require('socket.io');
var crypto = require('crypto');

var router = express();
var server = http.createServer(router);
io = io.listen(server, {log: false});

router.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

io.on('connection', function(client) {
  
  client.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  client.on('fingerprint', function(data){
    client.emit('userid', {name: hashId(data)});
  });
})

var hashId = function(data) {
  var dataString = "" + data.time + data.width + data.height + data.depth
    + data.font_key;
  var id = crypto.createHash('md5').update(dataString).digest('hex');
  console.log("USERID: " + id);
  return id;
}
