import React from 'react';
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import VideoPlayer from './components/VideoPlayer';
import Notifications from './components/Notifications';
import Options from './components/Options';
import Chat from './components/Chat';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid black',

        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
    image: {
        marginLeft: '15px',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

const App = () => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        {/* <Typography variant="h6" className={classes.title}>
                            News
                        </Typography> */}
                        
                        {/* <Button color="inherit">Login</Button> */}
                        <Typography variant="h3" className={classes.title} align="center">
                            Face Chat
                        </Typography>
                        
                    </Toolbar>
                </AppBar>
            </div>


            <div className={classes.wrapper}>
                {/* <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography variant="h2" align="center">Video Chat</Typography>
                </AppBar> */}
                <VideoPlayer />
                <Options>
                    <Notifications />
                </Options>
                <Chat />

            </div>
        </div>
    );
};

export default App;