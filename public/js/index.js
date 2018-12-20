var socket =  io();

function scrollToBottom(){

    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight  = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}


socket.on('connect',()=>{
    console.log('connected to server');

});

socket.on('disconnect',()=>{
    console.log('disconnect from server');
})

socket.on('newMessageEvent',(message)=>{
    var template = jQuery('#message-template').html();
    var formatedTime = moment(message.createdAt).format('h:mm:a');

    var html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formatedTime
    });

    scrollToBottom()

    jQuery('#messages').append(html);




   /* var formatedTime = moment(message.createdAt).format('h:mm:a');
    console.log('message info',message)
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formatedTime}:${message.text}`);
    jQuery('#messages').append(li);*/
});

socket.on('newLocationMessage',(locationInfo)=>{

    console.log('locationInfo',locationInfo);

    var template = jQuery('#location-template').html();
    var formatedTime = moment(locationInfo.createdAt).format('h:mm:a');

    var html = Mustache.render(template,{
        from:locationInfo.from,
        url:locationInfo.url,
        createdAt:formatedTime
    });

    scrollToBottom();

    jQuery('#messages').append(html);


})



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

