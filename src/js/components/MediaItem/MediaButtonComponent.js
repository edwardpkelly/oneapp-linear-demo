import React from 'react';
import { Fragment } from 'react';
import MediaButton from './MediaButton';

const MediaButtonComponent = props => {
    const {
        callsigns,
        handleWatchBtnClick
    } = props;

    return (
        <Fragment>
            {
                callsigns.length ?
                    callsigns.map((item, index) => {
                        return <MediaButton key={index} callsign={item} handleWatchBtnClick={handleWatchBtnClick} />
                    }) : <MediaButton handleWatchBtnClick={handleWatchBtnClick} />
            }
        </Fragment>
    );
};

export default MediaButtonComponent;