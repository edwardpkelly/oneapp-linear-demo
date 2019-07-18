import React from 'react';
import upperFirst from '../../utils/ui/uppercaseFirst';

const MediaButton = props => {
    const {
        callsign,
        label,
        name,
        handleWatchBtnClick
    } = props;

    const btnString = callsign ? upperFirst(callsign) : 'Watch ' + label;

    return (
        <button
            type="button"
            class="btn btn-sm btn-outline-primary"
            onClick={() => handleWatchBtnClick(name, callsign)}
        >
            {
                btnString
            }
        </button>
    );
};

export default MediaButton;