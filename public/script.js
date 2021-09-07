//JS for front-end goes here
//mediaDevice is a promice, an event in the futre that will be either resolved or rejected
const socket = io('/')
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
	path: '/peerjs',
	host: '/',
	port: '3030'
});

let myVideoStream;
navigator.mediaDevices.getUserMedia({
	video: true, //grant access to video
	audio: true //grant access to audio
}).then(stream => {
	myVideoStream = stream;
	addVideoStream(myVideo, stream);

	peer.on('call', call => {
		call.answer(stream)
		const video = document.createElement('video')
		call.on('stream', userVideoStream => {
			addVideoStream(video, userVideoStream)
		}) 
	})

	socket.on('user-connected', userId => {
		connectToNewUser(userId, stream);
	})
})


socket.emit('join-room', ROOM_ID);

//automatically generate unique ids using peer object
peer.on('open', id => {
	socket.emit('join-room', ROOM_ID, id);
})

const connectToNewUser = (userId, steam) => {
	const call = peer.call(userId, stream)
	const video = document.createElement('video')
	call.on('stream', userVideoStream => {
		addVideoStream(video, userVideoStream)
	})
}

const addVideoStream = (video, stream) => {
	video.srcObject = stream;
	video.addEventListener('loadedmetadata', () => {
		video.play();
	})

	videoGrid.append(video)
} 