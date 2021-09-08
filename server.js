const express = require('express');
const app = express(); //Initialize express application
//create server
const server = require('http').Server(app);
//import socket.io
const io = require('socket.io')(server)
//import uuid to create an unique room id
const { v4: uuidv4 } = require('uuid');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
	debug: true
});

//set view file as ejs
app.set('view engine', 'ejs');

//static folder inside the public url
app.use(express.static('public'));


app.use('/peerjs', peerServer);
app.get('/', (req, res) => {
	res.redirect(`/${uuidv4()}`);
})


app.get('/:room', (req, res) => {
	res.render('room', { roomId: req.params.room });
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit("user-connected", userId);
  }); 
})

server.listen(3030);
