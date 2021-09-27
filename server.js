const express = require('express');
const app = express(); //Initialize express application
//create server
const server = require('http').Server(app);
//import socket.io
const io = require('socket.io')(server)
//import uuid to create an unique room id
const { v4: uuidv4 } = require('uuid');
//import peer class for peer-peer functionality
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
	debug: true
});

//set view file as ejs
app.set('view engine', 'ejs');

//static folder inside the public url
app.use(express.static('public'));

//a combonation of peer and js where they work together for peer-peer 
app.use('/peerjs', peerServer);

//this redirect to the URL derived from the uuid
app.get('/', (req, res) => {
	res.redirect(`/${uuidv4()}`);
})

//:room here is a param where it is a var for the unique URL 
//from the previous function. This func render "room" as res 
//and pass in the param from req to res to the client-side(frontend)
app.get('/:room', (req, res) => {
	res.render('room', { roomId: req.params.room });
})

//The Server instance emits one single event - connection
io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.on('connection-request', (userId) => {
        io.to(roomId).emit('new-user-connected',userId);
    })
    // messages
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message)
  }); 
  })
})

server.listen(3030);