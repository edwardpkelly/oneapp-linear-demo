import React from 'react';

const MediaButton = props => {
    const {
        callsign,
        label,
        name: brand,
        handleWatchBtnClick
    } = props;

    const callsignData = callsign ? callsign.data : null;

    const btnString = callsign ? callsign.label : 'Watch ' + label;

    return (
        <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={() => handleWatchBtnClick(brand, callsignData)}
        >
            {
                btnString
            }
        </button>
    );
};

export default MediaButton;