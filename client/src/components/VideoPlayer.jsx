import React, {useContext} from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../SocketContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const useStyles = makeStyles((theme) => ({
    video: {
        //width of video stream on non-mobile devices
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
    const { myVideo, stream, name, userID, setUsers, setUser, setSignals, setRoom, setStream, setVideos, users, userIDs, roomID, videos, signals, connectToRoom, sendMessage, leaveCall } = useContext(SocketContext);
    const classes = useStyles();
    return (
        //Body element which covers entire screen
        <body>
        {/*material ui grid component*/}
            <div className={"main"}>
                <div className={"main__left"}>
                    <div className={"main__videos"}>
                        {/*material ui grid component*/}
                        <Grid container className={classes.gridContainer}>
                            {/*Current user video*/}
                                <Grid item xs={12} md={12}>
                                    <Typography variant="h5" gutterBottom>{name}</Typography>
                                    <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
                                </Grid>
                        </Grid>
                    </div>
                    <div className="main__controls">
                        <div className="main__controls__block">
                            <div className="main__controls__button">
                                <FontAwesomeIcon icon="microphone"/>
                                <span>Mute</span>
                            </div>
                            <div className="main__controls__button">
                                <FontAwesomeIcon icon="video"/>
                                <span>Stop Video</span>
                            </div>
                        </div>
                        <div className="main__controls__block">
                            <div className="main__controls__button">
                                <FontAwesomeIcon icon="shield-alt"/>
                                <span>Security</span>
                            </div>
                            <div className="main__controls__button">
                                <FontAwesomeIcon icon="user-friends"/>
                                <span>Participants</span>
                            </div>
                        </div>
                        <div className="main__controls__block">
                            <div className="main__controls__button">
                                <span className="leave_meeting">Leave Meeting</span>
                            </div>
                        </div>
                    </div>
                </div>
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