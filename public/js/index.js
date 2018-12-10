var socket =  io();

socket.on('connect',()=>{
    console.log('connected to server');

});

socket.on('disconnect',()=>{
    console.log('disconnect from server');
})

socket.on('newMessageEvent',(message)=>{
    console.log('message info',message)
})

