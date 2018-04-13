const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname , "../public");
const port = process.env.PORT || 8000;
const express = require('express');
const socketIO = require('socket.io');

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

    socket.on('disconnect' , ()=>{
        console.log("User was disconnected");
    });
});

server.listen(port , ()=>{
    console.log(`Started on port ${port}`);
});