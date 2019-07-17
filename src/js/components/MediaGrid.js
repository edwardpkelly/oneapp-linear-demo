import React from 'react';
import { connect } from 'react-redux';

import MediaItem from './MediaItem/MediaItem';

const MediaGrid = props => {
    const { 
        auth,
        media 
    } = props;

    const { mediaItems } = media;
    const { userAuthenticated } = auth;

    return (
        mediaItems.map((item, index) => {
            return <MediaItem 
                        key={index}
                        name={item.name} 
                        callsigns={item.callsigns} 
                        displayName={item.displayName}
                        userAuthenticated={userAuthenticated}
                    />
        })
    )
};

const mapStateToProps = state => ({
    auth: state.auth,
    media: state.media
});

export default connect(mapStateToProps)(MediaGrid);