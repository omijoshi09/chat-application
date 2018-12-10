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

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
       /* io.emit('newMessageEvent',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        })*/

        socket.broadcast.emit('newMessageEvent',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        })
    })

    socket.on('disconnect',(socket)=>{
        console.log('disconnected')
    });



});

server.listen(port,() => {
    console.log('server is up on 3000');
});




