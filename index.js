//using node.js to import libraries and () creates the module.
const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

//We set up the port which uniquely identifies a network transaction
//by specifying host and service. We use process.env.PORT incase
//we are deployed on a host server which sets our environment port
//for us.
const PORT = process.env.PORT || 5000;

//Here we use routing in express and match requests use
//the '/' root route path. Incoming requests (req) will be matched to
//our root directory where we will respond with the response (res)
//message.
app.get("/", (req, res) => {
    res.send('Server is running.');
});

//We listen for the connection event to take place and when it
//does, we launch the socket function to transmit data in real-time.
io.on('connection', (socket) => {
    //You send a message to all clients with emit.
    socket.emit('me', socket.id);
    //listen for a disconnect event and the following function runs.
    socket.on('disconnect', () => {
        //allows message to be sent to everyone except the client
        //ending the call.
       socket.broadcast.emit('Call ended');
    });
    //When the callUser event happens, we can get data from the front
    //end of our application and connect to said user
    socket.on("callUser", ({ userID, signalData, from, name }) => {
        //send private message to client with specific userID
        io.to(userID).emit("callUser", { signal: signalData, from, name });
    });
    socket.on("answerCall", (data) => {
        //We don't destructure the data in this case like we did
        //in callUser.
       io.to(data.to).emit("callAccepted", data.signal);
    });
});

//Allows us to listen for connections to our computer using our
//specified port number on our local network.
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));