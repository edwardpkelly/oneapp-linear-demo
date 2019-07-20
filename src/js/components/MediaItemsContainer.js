import React from 'react';
import { connect } from 'react-redux';

import MediaItem from './MediaItem/MediaItem';
import { 
    signInButtonSelected,
    watchButtonSelected
} from '../state/actions/user-actions';

const MediaItemsContainer = props => {
    const {
        auth,
        media,
        player,
        signInButtonSelected,
        watchButtonSelected
    } = props;

    const {
        currentMediaItem
    } = player;

    const {
        brand: currentBrand,
        callsignData: currentCallsign
    } = currentMediaItem;
    
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
                currentCallsign={currentCallsign}
                isSelectedItem={currentBrand === item.data}
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
    media: state.media,
    player: state.player
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaItemsContainer);