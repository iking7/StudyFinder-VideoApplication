import React from 'react';
import './App.css';
import {SocketContext} from "./SocketContext";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <div>
      <VideoPlayer/>
    </div>
  );
}

export default App;
