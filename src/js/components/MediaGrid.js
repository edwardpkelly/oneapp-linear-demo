import React from 'react';
import { connect } from 'react-redux';

import MediaItem from './MediaItem';

const MediaGrid = props => {
    const { media } = props;
    const { mediaItems } = media;

    return (
        mediaItems.map((item, index) => {
            return <MediaItem 
                        key={index}
                        name={item.name} 
                        callsigns={item.callsigns} 
                        displayName={item.displayName}
                    />
        })
    )
};

const mapStateToProps = state => ({
    media: state.media
});

export default connect(mapStateToProps)(MediaGrid);