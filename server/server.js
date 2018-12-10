const path = require('path');
const express = require('express');
const socket = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port  = process.env.PORT || 3000;

var app = express();
var server  = http.createServer(app);
var io = socket(server);


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
       io.emit('newMessageEvent',generateMessage(message.from,message.text));

       socket.emit('newMessageEvent',generateMessage('Admin','Welcome to the chat app'));

        socket.broadcast.emit('newMessageEvent',generateMessage('Admin','UserJoined'));
    });

    socket.on('disconnect',(socket)=>{
        console.log('disconnected')
    });



});

server.listen(port,() => {
    console.log('server is up on 3000');
});




