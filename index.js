//using node.js to import libraries and () creates the module.
const app = require("express")();
const express = require(express);
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

//import uuid to create an unique room id
const { v4: uuidv4 } = require('uuid');
//import peer class for peer-peer functionality
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});

app.use(cors());

//We set up the port which uniquely identifies a network transaction
//by specifying host and service. We use process.env.PORT incase
//we are deployed on a host server which sets our environment port
//for us.
const PORT = 3030;

//static folder inside the public url
app.use(express.static('public'));

//a combination of peer and js where they work together for peer-peer
app.use('/peerjs', peerServer);

//Here we use routing in express and match requests use
//the '/' root route path. Incoming requests (req) will be matched to
//our root directory where we can respond with the response (res)
//message or send (redirect) the client to the URL derived from the uuid.
app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

//:room here is a param where it is a var for the unique URL 
//from the previous function. This func render "room" as res 
//and pass in the param from req to res to the client-side(frontend)
app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
})

//We listen for the connection event to take place and when it
//does, we launch the socket function to transmit data in real-time.
io.on('connection', (socket) => {
    // //You send a message to all clients with emit.
    // socket.emit('me', socket.id);
    //When the join-room event happens, we can get data from the front
    //end of our application and connect to the given room
    socket.on('join-room', (name, userID, roomID) => {
        socket.join(roomID);
        //When a connect-request event happens, we alert the room that
        //a new user has connected.
        socket.on('connection-request', () => {
            io.to(roomID).emit('new-user-connected', name, userID, roomID);
        });
        //Listen for a disconnect event and the following function runs.
        socket.on('disconnect', () => {
            //Allows message to be sent to everyone except the client
            //ending the call.
           socket.broadcast.emit('user-disconnected', name, userID, roomID);
        });
        socket.on("connectedToCall", ({ userID, stream }) => {
            io.to(roomID).emit("connectedCaller", {name, userID, roomID, stream});
        });
        // messages
        socket.on('message', (message) => {
          //send message to the same room
          io.to(roomID).emit('createMessage', message, name, userID, roomID);
        });
    });
});

//Allows us to listen for connections to our computer using our
//specified port number on our local network.
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));