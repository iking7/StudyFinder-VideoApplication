import React from 'react';
import './App.css';
import {SocketContext} from "./SocketContext";
import VideoPlayer from "./components/VideoPlayer";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faVideo, faMicrophone, faShieldAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faVideo, faMicrophone, faShieldAlt, faUserFriends)

function App() {
  return (
    <div>
      <VideoPlayer/>
    </div>
  );
}

export default App;
