var socket =  io();


socket.on('connect',()=>{
    console.log('connected to server');

});

socket.on('disconnect',()=>{
    console.log('disconnect from server');
})

socket.on('newMessageEvent',(message)=>{
    var formatedTime = moment(message.createdAt).format('h:mm:a');
    console.log('message info',message)
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formatedTime}:${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage',(locationInfo)=>{
    var li = jQuery('<li></li>');
    var formatedTime = moment(locationInfo.createdAt).format('h:mm:a');
    var a  = jQuery('<a target="_blank">My Curret location </a>');
    li.text(`${locationInfo.from}: ${formatedTime}`);
    a.attr('href',locationInfo.url);
    li.append(a);
    jQuery('#messages').append(li);

})

socket.emit('createMessage',{
    from:'frank',
    text:'Hi text...'

},function (data) {
    console.log(data);
});


jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage',{
        from:'User',
        text:messageTextbox.val()
    },function () {
        messageTextbox.val('')
    })
})

var locationButton = jQuery('#send-location');
locationButton.on('click',function () {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by browser')
    }


    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition((position)=>{
        console.log('position',position);
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    },(error)=>{
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Send location');
    })
})

