/// <reference path="./jquery-3.3.1.min.js" />

/* 
        Initiating request from the client to the server to open up a web socket and keep the connection open.
        Critical needed in order to listen data from server AND in order to send data to the server.
        */
var socket = io();

/*
    Now to connect the event , we are going to make same method as server side.

    'connect' -> EVENT for client
*/
socket.on('connect', function () {
    console.log("Connect to server");
});

socket.on('disconnect', function () {
    console.log("Disconnected from server");
});

socket.on('newMessage', function (newMessage){
    console.log(newMessage);
    // Make a list tag to pass in HTML
    var li = $('<li></li>');
    // Inject Data into list to make text only
    li.text(`${newMessage.from} : ${newMessage.text}`);
    // Append into messages id that can display in HTML
    $('#messages').append(li);
});

socket.emit('createMessage' , {
    from : 'Frank',
    text : "Hi"
}, function (data){
    // acknowledgement
    console.log("Got it",data);
});

$('#message-form').on('submit' , function (e) {
    // preventDefault is going to to prevent DEFAULT BEHAVIOUR
    // It's default behaviour is the page refresh with the query string.
    e.preventDefault();  
    var self = this;
    // Disable form
    self.setAttribute('disabled' , true);
    self.firstElementChild.setAttribute('disabled' , true);

    socket.emit('createMessage', {
        from : 'User',
        text : e.target.elements.message.value
    } , function (){
        // enable form
        self.firstElementChild.removeAttribute('disabled');
        self.firstElementChild.value = "";
    });
});

// Goal : Share coordinates with other users
/**
 * 1. Have a client emit "sendLocation" with an object as the data
 *  - Object should contain latitude and longitude properties
 * 2. Server should listen for "sendLocation"
 *  - When fired, send a "message" to all connected clients "Location : lat, long"
 * 3. Test your work !
 */

 document.getElementById('send-location').addEventListener('click' , function(e){
     e.preventDefault();
     if (!navigator.geolocation) alert('Geolocation is not supported in your browser');

     navigator.geolocation.getCurrentPosition(function(position){
         console.log('Sending Location')
         socket.emit('sendLocation', {
            lat : position.coords.latitude,
            long: position.coords.longitude
         });
     });
 })