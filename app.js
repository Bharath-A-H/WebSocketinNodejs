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

io.on('connection',function(socket){
    console.log('A user connected');

    socket.on('myCustomEventFromClientSide', function(data){
        console.log(data)
    })

    // setTimeout(function(){
    //      socket.emit('myCustomEvent', {description: ' A custom message from server side!'});
    //       },3000);

    socket.on('disconnect', function(){
        console.log('A user disconnected')
    })
});

http.listen(3000, function(){
    console.log('Server ready on 3000')
})