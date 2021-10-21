import React, { useContext, useState }from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../SocketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToggleOnTwoTone, ViewArraySharp } from '@material-ui/icons';
import { library, icon } from '@fortawesome/fontawesome-svg-core' 
import { faVideoSlash, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'
library.add(faVideoSlash, faMicrophoneSlash);



const useStyles = makeStyles((theme) => ({
    video: {
        //scale of video stream on non-mobile devices
        //and justification/mirroring of video
        width: '75%',
        height: '75%',
        transform: 'scaleX(-1)',
        position: 'relative',
        left: '10%',
        [theme.breakpoints.down('xs')]: {
            //width on mobile devices
            width: 'auto',
            height: 'auto',
        },
    },
    gridContainer: {
        //centered video content on non-mobile devices
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            //column view of video stream on mobile devices
            flexDirection: 'column',
        },
    },
}));

function BottomBotton(props) {
        return (
            <div className="main__controls__button" onClick ={props.toggle}>
                {/*Icon imported for microphone */}
                <FontAwesomeIcon icon={props.name} />
                <span>{props.text}</span>
            </div>
        )
    
}



const VideoPlayer = () => {
    //obtaining our variables from socket.io to use with interface
    const { myVideo, stream, name, userID, setUsers, setUser, setSignals, setRoom, setStream, setVideos, users, userIDs, roomID, videos, signals, connectToRoom, sendMessage, leaveCall } = useContext(SocketContext);

    //stlyes we defined in the function above
    const classes = useStyles();

    const [off, setOff] = useState(false);
    const [iconName1, setIconName1] = useState('microphone')
    const [iconName2, setIconName2] = useState('video')
    const [textName1, setTextName1] = useState('Mute')
    const [textName2, setTextName2] = useState('Stop Video')
    
    const toggleMute  = ()=> {
        if(!off) {
            setOff(true)
            setIconName1('microphone-slash')
            setTextName1('Unmute')
            // muteUnmute()
        } else{
            setOff(false)
            setIconName1('microphone')
            setTextName1('Mute')
            // muteUnmute()
        }
    }

    // const muteUnmute = (stream) => {
    //     const enabled = stream.getAudioTracks()[0].enabled;
    //     if (enabled) {
    //         stream.getAudioTracks()[0].enabled = false;
    //     } else {
    //         stream.getAudioTracks()[0].enabled = true;
    //     }
    // }

    const toggleVideo  = ()=> {
        if(!off) {
            setOff(true)
            setIconName2('video-slash')
            setTextName2('Start Video')
            // stream.
        } else{
            setOff(false)
            setIconName2('video')
            setTextName2('Stop Video')
        }
    }

    return (
        //Body element which covers entire screen
        <body>
            {/*various divisions to separate parts of the screen for
     video, buttons, etc.*/}
            <div className={"main"}>
                <div className={"main__left"}>
                    <div className={"main__videos"}>
                        {/*material ui grid component*/}
                        <Grid container className={classes.gridContainer}>
                            {/*Size of the video 12 is max, xs
                         mobile, md mid sized devices*/}
                            <Grid item xs={12} md={12}>
                                {/*Where we display this
                                 user's name*/}
                                <Typography variant="h5" gutterBottom>{name}</Typography>
                                {/*Current user video*/}
                                <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="main__controls">
                        <div className="main__controls__block">
                            <BottomBotton value={0} 
                            toggle = {()=> toggleMute()} 
                            name = {iconName1} 
                            text = {textName1}
                            off = {off} // for debug
                            />
                            <BottomBotton value={1} 
                            toggle = {()=> toggleVideo()} 
                            name = {iconName2} 
                            text = {textName2}
                            off = {off}
                            />
                            
                        </div>
                        <div className="main__controls__block">
                            {/* <div className="main__controls__button">
                                <FontAwesomeIcon icon="shield-alt" />
                                <span>Security</span>
                            </div> */}
                            <div className="main__controls__button">
                                {/*Icon imported for participants*/}
                                <FontAwesomeIcon icon="user-friends" />
                                <span>Participants</span>
                            </div>
                        </div>
                        <div className="main__controls__block">
                            <div className="main__controls__button">
                                {/*Leave meeting button*/}
                                <span className="leave_meeting">Leave Meeting</span>
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
                        <input id="chat_message" type="text" placeholder="Type message here..." />
                    </div>
                </div>
            </div>
        </body>
    )





};

export default VideoPlayer;