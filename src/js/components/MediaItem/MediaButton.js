import React from 'react';

const MediaButton = props => {
    const { 
        callsign,
        label,
        name,
        handleWatchBtnClick
     } = props;

    return (
        <button
            type="button" 
            className="btn btn-lg btn-block btn-primary btn-watch-now"
            onClick={() => handleWatchBtnClick(name, callsign)}
        >
            Watch {label} {callsign}
        </button>
    )
};

export default MediaButton;