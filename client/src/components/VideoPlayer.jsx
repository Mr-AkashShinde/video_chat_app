import React from "react";
import { Grid, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../SocketContext";
import { useContext } from "react";
import { IconButton, Icon } from "@material-ui/core";
import { Mic, Videocam } from "@material-ui/icons";
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "330px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
  },
  icons: {
    display: "flex",
    justifyContent: "center",
  },
}));

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    videoMuted,
    setVideoMuted,
    audioMuted,
    setAudioMuted,
  } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {/* Our own video */}
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "User's name: "}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
          <div className={classes.icons}>
            <IconButton color="inherit" aria-label="Mic">
              <Icon onClick={() => setAudioMuted(!audioMuted)}>
              {audioMuted ? <MicOffIcon/>:  <Mic />}  
              </Icon>
            </IconButton>
            <IconButton color="inherit" aria-label="Videocam">
              <Icon onClick={() => setVideoMuted(!videoMuted)}>
               {videoMuted ? <VideocamOffIcon/>:<Videocam />}
              </Icon>
            </IconButton>
          </div>
        </Paper>
      )}

      {/* User's video */}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
          <div className={classes.icons}>
            <IconButton color="inherit" aria-label="Mic">
              <Icon >
                <Mic />
              </Icon>
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Videocam"
            >
              <Icon>
                <Videocam />
              </Icon>
            </IconButton>
          </div>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
