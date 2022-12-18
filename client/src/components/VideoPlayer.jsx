import React from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from '../SocketContext';
import { useContext } from 'react';
import { IconButton, Icon } from '@material-ui/core';
import { Mic, Videocam } from '@material-ui/icons';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    video: {
        width: '550px',
        [theme.breakpoints.down('xs')]: {
            width: '330px',
        },
    },
    gridContainer: {
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    paper: {
        padding: '10px',
        border: '2px solid black',
        margin: '10px',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
    },
    icons: {
        display: 'flex',
        justifyContent: 'center',
    }

}));

const VideoPlayer = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
    const classes = useStyles();
    const [mineVideo,setMineVideo]=useState(myVideo);
    const handleAudio=()=>{

    }
    const handleVideo=()=>{
        
    // mineVideo===null ? setMineVideo(myVideo): setMineVideo(null);
    // setMineVideo(myVideo);
    myVideo.current.srcObject = null ? myVideo.current.srcObject=stream:myVideo.current.srcObject=null;
    
    }
    return (
        <Grid container className={classes.gridContainer}>
            {/* Our own video */}
            {
                stream && (
                    <Paper className={classes.paper}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>{name || "User's name: "}</Typography>
                            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />

                        </Grid>
                        <div className={classes.icons}>
                        <IconButton  color="inherit" aria-label="Mic">
                            <Icon onClick={handleAudio}>
                                <Mic />
                            </Icon>
                        </IconButton>
                        <IconButton  color="inherit" aria-label="Videocam">
                            <Icon onClick={handleVideo}>
                                <Videocam />
                            </Icon>
                        </IconButton>
                        </div>
                    </Paper>
                )
            }

            {/* User's video */}
            {
                callAccepted && !callEnded && (
                    <Paper className={classes.paper}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
                            <video playsInline ref={userVideo} autoPlay className={classes.video} />

                        </Grid>
                        <div className={classes.icons}>
                        <IconButton  color="inherit" aria-label="Mic">
                            <Icon onClick={handleAudio}>
                                <Mic />
                            </Icon>
                        </IconButton>
                        <IconButton onClick={handleVideo} color="inherit" aria-label="Videocam">
                            <Icon>
                                <Videocam />
                            </Icon>
                        </IconButton>
                        </div>
                    </Paper>
                )
            }
        </Grid>
    )
}

export default VideoPlayer;