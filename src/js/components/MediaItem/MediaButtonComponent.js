import React from 'react';
import { Fragment } from 'react';
import MediaButton from './MediaButton';

const MediaButtonComponent = props => {
    const {
        callsigns,
        currentCallsign,
        isSelectedItem,
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
                                isSelectedBtn={isSelectedItem ? (currentCallsign.label != "" ? item.data === currentCallsign.data : true) : false}
                                label={label} 
                                name={name} 
                                handleWatchBtnClick={handleWatchBtnClick} 
                            />
                        )
                    }) : <MediaButton 
                            name={name} 
                            isSelectedBtn={isSelectedItem}
                            label={label} 
                            handleWatchBtnClick={handleWatchBtnClick} />
            }
        </Fragment>
    );
};

export default MediaButtonComponent;