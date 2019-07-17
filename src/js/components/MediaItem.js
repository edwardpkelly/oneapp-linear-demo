import React from 'react';
import MediaButton from './MediaButton';

const MediaItem = props => {
    
    const {
        name,
        displayName,
        callsigns
    } = props;

    const imgUrl = `images/${name}.png`;

    return (
        <div className="col-lg-4 col-md-6">
            <div className="card mb-4 shadow-sm">
                <img className="card-img-top" src={imgUrl} alt={displayName} />
                <div className="card-body">
                    {
                        callsigns.length ? 
                        callsigns.map(item => {
                            return <MediaButton callsign={item}/>
                        }) :
                        <MediaButton />
                    }
                </div>
            </div>
        </div>
    )
};

export default MediaItem;