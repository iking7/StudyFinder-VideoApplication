import React from "react";

class MainScreen extends React.Component {

    render() {
        return (
            <body>
                <div class="main">
                    <div class="main__left">
                        <div class="main__videos">
                            <div id="video-grid" ref={this.useVideoGrid}>

                            </div>
                        </div>
                        <div class="main__controls">
                            <div class="main__controls__block">
                                <div class="main__controls__button">
                                    <i class="fas fa-microphone"></i>
                                    <span>Mute</span>
                                </div>
                                <div class="main__controls__button">
                                    <i class="fas fa-video"></i>
                                    <span>Stop Video</span>
                                </div>
                            </div>
                            <div class="main__controls__block">
                                <div class="main__controls__button">
                                    <i class="fas fa-shield-alt"></i>
                                    <span>Security</span>
                                </div>
                                <div class="main__controls__button">
                                    <i class="fas fa-user-friends"></i>
                                    <span>Participants</span>
                                </div>
                            </div>
                            <div class="main__controls__block">
                                <div class="main__controls__button">
                                    <span class="leave_meeting">Leave Meeting</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="main__right">
                        <div class="main__header">
                            <h6>Chat</h6>
                        </div>
                        <div class="main__chat_window">
                            <ul class="messages">

                            </ul>
                        </div>
                        <div class="main__message_container">
                            <input id="chat_message" type="text" placeholder="Type message here..."></input>

                        </div>
                    </div>
                </div>
                <script type="module" src="script.js"></script>
            </body>
        );
    }
}

export default MainScreen;