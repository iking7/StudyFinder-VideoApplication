import React, {useContext} from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../SocketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

const VideoPlayer = () => {
    //obtaining our variables from socket.io to use with interface
    const { myVideo, stream, name, userID, setUsers, setUser, setSignals, setRoom, setStream, setVideos, users, userIDs, roomID, videos, signals, connectToRoom, sendMessage, leaveCall } = useContext(SocketContext);
    //stlyes we defined in the function above
    const classes = useStyles();
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
                                    <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
                                </Grid>
                        </Grid>
                    </div>
                    <div className="main__controls">
                        <div className="main__controls__block">
                            <div className="main__controls__button">
                                {/*Icon imported for microphone*/}
                                <FontAwesomeIcon icon="microphone"/>
                                <span>Mute</span>
                            </div>
                            <div className="main__controls__button">
                                {/*Icon imported for video*/}
                                <FontAwesomeIcon icon="video"/>
                                <span>Stop Video</span>
                            </div>
                        </div>
                        <div className="main__controls__block">
                            <div className="main__controls__button">
                                {/*Icon imported for security logo*/}
                                <FontAwesomeIcon icon="shield-alt"/>
                                <span>Security</span>
                            </div>
                            <div className="main__controls__button">
                                {/*Icon imported for participants*/}
                                <FontAwesomeIcon icon="user-friends"/>
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
                        <input id="chat_message" type="text" placeholder="Type message here..."/>
                    </div>
                </div>
            </div>
        </body>
   );
};

export default VideoPlayer;