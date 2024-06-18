var app = require('express')();
var http = require('http').Server(app);

var path = require('path');
const { Socket } = require('socket.io');

var io = require('socket.io')(http);

app.get('/', function(req,res){

    var options = {
        root: path.join(__dirname)
    }
    var fileName= 'index.html';
    res.sendFile(fileName, options);
})

var roomno =1;
var full = 0;

io.on('connection',function(socket){
    console.log('A user connected');

    socket.join("room-"+roomno)
    io.sockets.in("room-"+roomno).emit('connectedRoom',"you are connected to room no. "+roomno);
    
    full++;
    if(full >=2){
        full=0;
        roomno++;
    }
    socket.on('disconnect', function(){
        console.log('A user disconnected')
    })
});

http.listen(3000, function(){
    console.log('Server ready on 3000')
})