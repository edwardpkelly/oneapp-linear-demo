import React from 'react';

const MediaButton = props => {
    const {
        callsign,
        isSelectedBtn,
        label,
        name: brand,
        handleWatchBtnClick
    } = props;

    const callsignData = callsign ? callsign.data : null;
    const btnString = callsign ? callsign.label : 'Watch ' + label;

    let btnClass = 'btn btn-sm'
    btnClass += (isSelectedBtn) ? ' btn-primary' : ' btn-outline-primary';

    return (
        <button
            type="button"
            className={btnClass}
            disabled={isSelectedBtn}
            onClick={() => handleWatchBtnClick(brand, callsignData)}
        >
            {
                btnString
            }
        </button>
    );
};

export default MediaButton;