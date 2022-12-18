import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';


const SocketContext = createContext();

// const socket = io('http://localhost:5000');
const socket = io('https://facechat.up.railway.app/');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => { 
  
    navigator.mediaDevices.getUserMedia({ video:true, audio: true})
    .then((currentStream) => {
    // Disable the audio track
   audioMuted && (currentStream.getAudioTracks()[0].enabled=false);

    // Disable the video track
    videoMuted && (currentStream.getVideoTracks()[0].enabled=false);

      setStream(currentStream);
      myVideo.current.srcObject = currentStream;
    });

    socket.on('me', (id) => setMe(id));


    socket.on('calluser', ({ from, name: callerName, signal }) => {
      console.log('test9')
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });

     return () => {
    socket.off('me');
    socket.off('calluser');
  };
  }, [audioMuted,videoMuted]);
  //console.log(me);
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answercall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      console.log('test1')
      socket.emit('calluser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      console.log('test2')
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callaccepted', (signal) => {
      console.log('test3')
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      callUser,
      leaveCall,
      answerCall,
      videoMuted, setVideoMuted,
      audioMuted, setAudioMuted,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };