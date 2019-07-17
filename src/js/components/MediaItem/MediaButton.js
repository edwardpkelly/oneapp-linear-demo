import React from 'react';

const MediaButton = props => {
    const { 
        callsign,
        handleWatchBtnClick
     } = props;

    return (
        <button
            type="button" 
            className="btn btn-lg btn-block btn-primary btn-watch-now"
            onClick={handleWatchBtnClick}
        >
            Watch Show {callsign}
        </button>
    )
};

export default MediaButton;