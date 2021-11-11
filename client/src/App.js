import React, {useState, useEffect} from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVideo, faVideoSlash, faMicrophone, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// Import the functions you need from the SDKs you need
// v9 compat packages are API compatible with v8 code
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {faMicrophoneAltSlash} from "@fortawesome/free-solid-svg-icons/faMicrophoneAltSlash";
import { useParams } from 'react-router';

library.add(faVideo, faMicrophone, faUserFriends, faMicrophoneAltSlash, faVideoSlash)


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDh2DYiOUe_Z5-qWY0aIRDNpoLNbtXbeNM",
    authDomain: "studyfind-e50ae.firebaseapp.com",
    projectId: "studyfind-e50ae",
    storageBucket: "studyfind-e50ae.appspot.com",
    messagingSenderId: "447557245777",
    appId: "1:447557245777:web:09b136ad99c6f6e3509170",
    measurementId: "G-VQC2NK0BQM"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
    iceCandidatePoolSize: 10,
};

// Global State
const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;

// HTML elements
let webcamVideo = document.getElementById('webcamVideo');
let remoteVideo = document.getElementById('remoteVideo');

// 1. Setup media sources
class AppStreamCam extends React.Component {

    leaveMeeting() {
        window.close();
    }

    async streamLocalCamVideo() {
        console.log('stream')
        const constraints = {
            audio: true,
            video: {width: 1280, height: 720}
        };

        localStream = await navigator.mediaDevices.getUserMedia(constraints);
        remoteStream = new MediaStream();

        const video = document.querySelector("video");
        video.srcObject = localStream;
        video.onloadedmetadata = function (e) {
            video.play();
        };
        const lsTracks = localStream.getTracks();
        pc.addTrack(lsTracks[0], localStream);
        pc.addTrack(lsTracks[1], localStream);

        pc.ontrack = (event) => {
            const tracks = event.streams[0].getTracks();
            remoteStream.addTrack(tracks[0]);
            remoteStream.addTrack(tracks[1]);
        };

        webcamVideo = document.getElementById('webcamVideo');
        remoteVideo = document.getElementById('remoteVideo');
        webcamVideo.srcObject = localStream;
        remoteVideo.srcObject = remoteStream;

        
    }

// 2. Create an offer
    async callButton(roomID) {
        // Reference Firestore collections for signaling
        const callDoc = firestore.collection('calls').doc(roomID);
        const offerCandidates = callDoc.collection('offerCandidates');
        const answerCandidates = callDoc.collection('answerCandidates');
        // Get candidates for caller, save to db
        pc.onicecandidate = (event) => {
            event.candidate && offerCandidates.add(event.candidate.toJSON());
        };

        // Create offer
        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(await offerDescription);

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };

        await callDoc.set({offer});

        // Listen for remote answer
        callDoc.onSnapshot((snapshot) => {
            const data = snapshot.data();
            if (!pc.currentRemoteDescription && data?.answer) {
                const answerDescription = new RTCSessionDescription(data.answer);
                pc.setRemoteDescription(answerDescription);
            }
        });

        // When answered, add candidate to peer connection
        answerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.addIceCandidate(candidate);
                }
            });
        });
    };

    // 3. Answer the call with the unique ID
    async answerButton(roomID) {
        const callDoc = firestore.collection('calls').doc(roomID);
        const answerCandidates = callDoc.collection('answerCandidates');
        const offerCandidates = callDoc.collection('offerCandidates');

        pc.onicecandidate = async (event) => {
            (await event.candidate) && await answerCandidates.add(event.candidate.toJSON());
        };

        const callData = (await callDoc.get()).data();

        const offerDescription = callData.offer;
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(await answerDescription);

        const answer = {
            sdp: (await answerDescription).sdp,
            type: (await answerDescription).type,
        };

        await callDoc.update({answer});

        offerCandidates.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                console.log(change);
                if (change.type === 'added') {
                    let data = change.doc.data();
                    pc.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });

        remoteStream = new MediaStream();
        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
                const video2 = document.getElementById("remoteVideo");
                video2.srcObject = event.streams[0];
                video2.onloadedmetadata = function (e) {
                    video2.play();
                };
            });
        }
    }
}

function App(props) {
    const a = new AppStreamCam();
    let roomID = useParams().roomID

    const [vid, setVid] = useState("video");
    const [mic, setMic] = useState("microphone");
    const [audio, setAudio] = useState(webcamVideo === null);
    const [video, setVideo] = useState(webcamVideo === null);

    function toggleAudio() {
        setAudio(!audio);
    }

    function toggleVideo() {

        setVideo(!video);
    }

    useEffect(() => {
        (async function() {
            if (webcamVideo && webcamVideo.srcObject.getAudioTracks()) {
                if (audio) {
                    await setMic("microphone");
                } else {
                    await setMic("microphone-alt-slash");
                }
                webcamVideo.srcObject.getAudioTracks()[0].enabled = audio;
            } else {
                await a.streamLocalCamVideo();
                if (webcamVideo && webcamVideo.srcObject.getAudioTracks()) {
                    await setMic("microphone");
                } else {
                    await setMic("microphone-alt-slash");
                }
            }
            if (webcamVideo && webcamVideo.srcObject.getVideoTracks()) {
                if (video) {
                    await setVid("video");
                } else {
                    await setVid("video-slash");
                }
                webcamVideo.srcObject.getVideoTracks()[0].enabled = video;
            } else {
                await a.streamLocalCamVideo();
                if (webcamVideo && webcamVideo.srcObject.getVideoTracks()) {
                    await setVid("video");
                } else {
                    await setVid("video-slash");
                }
            }

            if (props.call) {
                a.callButton(roomID)
            } else {
                a.answerButton(roomID)
            }

        })();
    }, [audio, video, mic, vid]);


    return (
        //Body element which covers entire screen
        <body>
        {/*various divisions to separate parts of the screen for
     video, buttons, etc.*/}
        <div className={"main"}>
            <div className={"main__left"}>
                <div className={"main__videos"}>
                    {/*Current user video*/}
                    <video id="webcamVideo" muted autoPlay
                           ref={a.streamLocalCamVideo} playsInline
                           className={"videos"}
                    />
                    {/*Remote user video*/}
                    <video id="remoteVideo" autoPlay playsInline
                           className={"videos"}
                    />
                </div>

                <div className={"main__right"}>
                    <div className={"main__videos"}>
                    </div>
                    <div className="main__controls">
                        <div className="main__controls__block"
                             onClick={toggleAudio}>
                            <div
                                className="main__controls__button">
                                <FontAwesomeIcon icon={mic}>
                                </FontAwesomeIcon>
                                <span>Microphone</span>
                            </div>
                        </div>
                        <div className="main__controls__block"
                             onClick={toggleVideo}>
                            <div
                                className="main__controls__button">
                                <FontAwesomeIcon icon={vid}>
                                </FontAwesomeIcon>
                                <span>Video Camera</span>
                            </div>
                        </div>
                        <div className="main__controls__block">
                            <div
                                className="main__controls__button">
                                {/*Icon imported for participants*/}
                                <FontAwesomeIcon
                                    icon="user-friends"/>
                                <span>Participants</span>
                            </div>
                        </div>
                        <div className="main__controls__block">
                            <div
                                className="main__controls__button">
                                {/*Leave meeting button*/}
                                <span className="leave_meeting" onClick={a.leaveMeeting}>Leave Meeting</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Chat window content*/}
            <div className="main__right">
                <div className="main__header">
                    <h6>Chat</h6>
                </div>
                <div className="main__chat_window">
                    <ul className="messages">
                    </ul>
                </div>
                <div className="main__message_container">
                    <input id="chat_message" type="text"
                           placeholder="Type message here..." onSubmit={a.chatRender}/>
                </div>
            </div>
        </div>
        </body>
    );
}

//We can include gif for loading screen when another user has not
//connected yet: https://www.google.com/search?q=loading+dots+gif&client=safari&rls=en&sxsrf=AOaemvLaRE5rG2ZzKUCW-exXKymFw8mXNQ:1635404637385&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj4nuaDxezzAhW_STABHbGbBO4Q_AUoAXoECAEQAw&biw=1440&bih=686&dpr=2#imgrc=SLjfp2efSU-4zM&imgdii=pNxQvo5VJxlcLM

export default App;