const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname , "../public");
const port = process.env.PORT || 8000;
const hostname = process.env.HOSTNAME || "http://localhost";
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

/*
    io.on -> Let you register event listener , we can do something with the event.

    'connection' -> Is a POPULAR EVENT that we used.This lets you listen for a new connection meaning that a client connected to the server. And do something with the connection comes in.
*/
io.on('connection' , (socket)=>{
    console.log("New User Connected");

    socket.emit('newMessage', generateMessage('Admin' , "Welcome to the chat app"));

    socket.broadcast.emit('newMessage', generateMessage('Admin' , 'New User Joined'));

    socket.on('createMessage', (createMessage ,callback)=>{
        console.log(JSON.stringify(createMessage , undefined , 2));
        io.emit('newMessage' , generateMessage(createMessage.from , createMessage.text));
        callback('This is from the server');
        // Fired everybody but myself, event must be identical
        // socket.broadcast.emit('newMessage' , {
        //     from : createMessage.from,
        //     text : createMessage.text,
        //     createdAt : new Date().getTime()
        // });
    });

    socket.on('sendLocation', (coords)=>{
        io.emit('newMessage', `Location: ${coords.lat} , ${coords.long}`)
    })

    socket.on('disconnect' , ()=>{
        console.log("User was disconnected");
    });
});

server.listen(port , ()=>{
    console.log(`Started on ${hostname}:${port}`);
});