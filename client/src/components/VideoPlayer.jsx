import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
    video: {
        //width of video stream on non-mobile devices
        width: '550px',
        [theme.breakpoints.down('xs')]: {
            //width on mobile devices
            width: '300px',
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
    paper: {
        //layout surrounding and behind video color
        padding: '10px',
        border: '2px solid black',
        margin: '10px',
        backgroundColor: 'black',
    },
}));

const VideoPlayer = () => {
    const classes = useStyles();
    return (
       //material ui grid component
     <Grid container className={useStyles().gridContainer}>
         {/*Current user video*/}
         <Paper className={useStyles().paper}>
            <Grid item xs={12} md={3}>
                <Typography variant="h5" gutterBottom>Name</Typography>
                <video playsInline muted ref={null} autoPlay className={useStyles().video}/>
            </Grid>
         </Paper>
         {/*Other videos*/}
         <Paper className={useStyles().paper}>
             <Grid item xs={12} md={9}>
                 <Typography variant="h5" gutterBottom>Name</Typography>
                 <video playsInline ref={null} autoPlay className={useStyles().video}/>
             </Grid>
         </Paper>
     </Grid>
   );
};

export default VideoPlayer;