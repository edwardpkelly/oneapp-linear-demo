import React from 'react';

const VideoPlayer = (props) => {
    return (
        <div id="videoplayer">
            <div id="player-auth-overlay">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <h3>Please login to watch.</h3>
                <h4>Awaiting authorization check.</h4>
            </div>
        </div>
    );
};

export default VideoPlayer;