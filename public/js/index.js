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
});
