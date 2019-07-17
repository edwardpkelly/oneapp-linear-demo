import React from 'react';
import { connect } from 'react-redux';

import MediaItem from './MediaItem/MediaItem';
import { 
    signInButtonSelected,
    watchButtonSelected
} from '../state/actions/user-actions';

const MediaGrid = props => {
    const {
        auth,
        media,
        signInButtonSelected,
        watchButtonSelected
    } = props;
    
    const { mediaItems } = media;
    const { userAuthenticated } = auth;

    const handleWatchBtnClick = (brand, callsign) => {
        watchButtonSelected({ brand, callsign });
    };

    const handleSignInBtnClick = () => {
        signInButtonSelected();
    };

    return (
        mediaItems.map((item, index) => {
            return <MediaItem
                key={index}
                name={item.data}
                callsigns={item.callsigns}
                displayName={item.displayName}
                userAuthenticated={userAuthenticated}
                handleWatchBtnClick={handleWatchBtnClick}
                handleSignInBtnClick={handleSignInBtnClick}
            />
        })
    )
};

const mapDispatchToProps = {
    signInButtonSelected,
    watchButtonSelected
};

const mapStateToProps = state => ({
    auth: state.auth,
    media: state.media
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaGrid);