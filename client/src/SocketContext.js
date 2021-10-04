//The following are react hooks and allow you to use react
//features without needing to write a class.
import React, {createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import $ from 'jquery';

//Essentially allows global access to information within file.
const SocketContext = createContext();
//After server is deployed, we can pass full url of deployed
//server here
const socket = io(`http://localhost:3000`);

const videoGrid = document.getElementById('video-grid');

//React functional component which includes our variable useStates
//necessary to run our video chat and functions to manipulate the
//call.
const ContextProvider = (({ children }) => {
    //react hooks which allows us to use and set the media stream
    //and other information passed in from the user's device for
    //access later with the video placement, connecting and
    //disconnecting of calls, messaging, etc.
    const [stream, setStream] = useState(null);
    const user = new Map();
    //user and their id
    const [name, userID, setUser] = useState(null);

    const allUsers = new Map();
    //all users and their ids
    const [users, userIDs, setUsers] = useState(null);
    //room and id
    const [roomID, setRoom] = useState('');

    const allVideos = new Map();
    const [videos, setVideos] = useState(null);

    //connection signals
    const allSignals = new Map();
    const [signals, setSignals] = useState(null);

    //variable using generic react hook to refer to mutable object
    //which holds the video stream on the user interface.
    const myVideo = useRef();
    //currently connected peer
    const connectionRef = useRef();
    //Runs code as soon as the page loads
    useEffect(() => {
        //Get user permission to access video and audio
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
            //Get the media stream and set it to a variable for
            //later access
            .then((currentStream) => {
                setStream(currentStream);
                //Populates the video iFrame in the interface used
                //in the Video component later.
                myVideo.current.srcObject = currentStream;
            });

        //When a user joins, add them to list of users and
        socket.on('join-room', (name, userID, roomID, signal) => {
            user.set(name, userID);
            setUser(user);
            setRoom(roomID);
            allUsers.set(name, userID);
            setUsers(allUsers);
            allSignals.set(userID, signal);
            setSignals(allSignals);
        });
        //We use an empty dependency array after the use effect so the
        //code is not always running
    }, []);

    const connectToRoom = ((name, userID) => {
        var newRoom = false;
        if (roomID === '' || roomID === null) newRoom = true;
        //using simple peer library to create a peer object capable
        //of video calling
        const peer = new Peer(undefined, {
            initiator: newRoom,
            path: '/peerjs',
            host: '/',
            port: '3000',
            trickle: false,
            stream
        });

        //When a user calls in, the user will be added to the room
        peer.on('callIn', (name, userID, signal) => {
            socket.emit('connectedToCall', {
                name: name,
                userID: userID,
                signal: signal
            });
            user.set(name, userID);
            setUser(user);
            allUsers.set(name, userID);
            setUsers(allUsers);
            allSignals.set(userID, signal);
            setSignals(allSignals);
        });
        //add user's video stream to room
        peer.on('stream', (userID, userVideoStream) => {
            user.set(name, userID);
            setUser(user);
            allUsers.set(name, userID);
            setUsers(allUsers);
            allVideos.set(userID, userVideoStream);
            setVideos(allVideos);
            setStream(userVideoStream);
        });

        //set the signal strength
        peer.signal(allSignals.get(userID));
        //set the reference to the current video
        connectionRef.current = peer;
    });

    const sendMessage = ((name, userID) => {
        var newRoom = false;
        if (roomID === '' || roomID === null) newRoom = true;
        //using simple peer library to create a peer object capable
        //of video calling
        const peer = new Peer(undefined, {
            initiator: newRoom,
            path: '/peerjs',
            host: '/',
            port: '3030',
            trickle: false,
            stream
        });

        user.set(name, userID);
        setUser(user);
        setRoom(roomID);
        allUsers.set(name, userID);
        setUsers(allUsers);

        //sending messages functionality
        let text = $("input");
        // when press enter send message
        $('html').keydown(function (e) {
            if (e.which === 13 && text.val().length !== 0) {
                socket.emit('message', text.val());
                text.val('');
            }
        });
        socket.on("createMessage", message => {
            $("ul").append(`<li class="message"><b>user</b><br/>${message}</li>`);
        });
    });

    const leaveCall = ((user, userID) => {
        user.set(name, userID);
        setUser(user);
        setRoom(roomID);
        allUsers.set(name, userID);
        setUsers(allUsers);
        //destroy connection and reload page after user leaves
        connectionRef.current.destroy();
        window.location.reload();
    });

    return (
        <SocketContext.Provider value={{myVideo, stream, name, userID, setUsers, setUser, setSignals, setRoom, setStream, setVideos, users, userIDs, roomID, videos, signals, connectToRoom, sendMessage, leaveCall}}>
            {children}
        </SocketContext.Provider>
    )
});
export { ContextProvider, SocketContext };