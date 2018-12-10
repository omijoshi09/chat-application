const path = require('path');
const express = require('express');
const socket = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname,'../public');
const port  = process.env.PORT || 3000;

var app = express();
var server  = http.createServer(app);
var io = socket(server);


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');


    socket.emit('newMessageEvent',{
        from:'testuser',
        text:'heya',
        createdAt:new Date()
    });

    socket.on('disconnect',(socket)=>{
        console.log('disconnected')
    });


    socket.on('createMessage',(data)=>{
        console.log('data',data);
    })
});

server.listen(port,() => {
    console.log('server is up on 3000');
});




