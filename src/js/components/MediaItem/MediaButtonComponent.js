import React from 'react';
import { Fragment } from 'react';
import MediaButton from './MediaButton';

const MediaButtonComponent = props => {
    const {
        callsigns,
        label,
        name,
        handleWatchBtnClick
    } = props;

    return (
        <Fragment>
            {
                callsigns.length ?
                    callsigns.map((item, index) => {
                        return (
                            <MediaButton 
                                key={index} 
                                callsign={item} 
                                label={label} 
                                name={name} 
                                handleWatchBtnClick={handleWatchBtnClick} 
                            />
                        )
                    }) : <MediaButton 
                            name={name} 
                            label={label} 
                            handleWatchBtnClick={handleWatchBtnClick} />
            }
        </Fragment>
    );
};

export default MediaButtonComponent;