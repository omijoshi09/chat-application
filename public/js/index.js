var socket =  io();

socket.on('connect',()=>{
    console.log('connected to server');

});

socket.on('disconnect',()=>{
    console.log('disconnect from server');
})

socket.on('newMessageEvent',(message)=>{
    console.log('message info',message)
    var li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);
    jQuery('#messages').append(li);
});

socket.emit('createMessage',{
    from:'frank',
    text:'Hi text...'

},function (data) {
    console.log(data);
});


jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();

    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()
    },function () {

    })
})