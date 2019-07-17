import React from 'react';
import { Fragment } from 'react';
import MediaButton from './MediaButton';

const MediaButtonComponent = props => {
    const {
        callsigns
    } = props;

    return (
        <Fragment>
            {
                callsigns.length ?
                    callsigns.map((item, index) => {
                        return <MediaButton key={index} callsign={item} />
                    }) : <MediaButton />
             }
        </Fragment>
    );
};

export default MediaButtonComponent;