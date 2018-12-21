const path = require('path');
const express = require('express');
const socket = require('socket.io');
const http = require('http');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port  = process.env.PORT || 3000;
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
var server  = http.createServer(app);
var io = socket(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        //io.emit => io.to('The office fans').emit // will send the message to all person in this room



        //socket.broadcast.emit => socket.broadcast.to('the office fam').emit  - will send message to all person in this room except current user
        socket.broadcast.to(params.room).emit('newMessageEvent',generateMessage('Admin',`${params.name}has joined`)); //will send message to everyone except the current user


        //socket.emit => will send personal message to two user no need to use room
        socket.emit('newMessageEvent',generateMessage('Admin','Welcome to the chat app'));

        //socket.leave (will leave)




        callback()
    })

    socket.on('createMessage',(message,callback)=>{
        console.log('user is',socket.id);

        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessageEvent',generateMessage(user.name,message.text)); //io.emit will emit event to every single user

        }
        callback();
    });


    socket.on('createLocationMessage',(coords)=>{
        console.log('tst',coords);
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude))

        }
    })

    socket.on('disconnect',()=>{
        console.log('disconnected');
        var user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessageEvent',generateMessage('Admin',`${user.name} has left the room`));
        }
    });



});

server.listen(port,() => {
    console.log('server is up on 3000');
});




