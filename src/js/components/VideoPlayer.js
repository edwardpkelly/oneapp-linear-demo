import React from 'react';
import { connect } from 'react-redux';

import AuthConstants from '../constants/auth-constants';

const VideoPlayer = props => {
    const {
        userAuthenticated
    } = props;

    let overlayClass = (userAuthenticated != AuthConstants.NOT_AUTHENTICATED) ? 
        'player-auth-overlay-hide' : 'player-auth-overlay-show';
    
    return (
        <div id="videoplayer">
            <div className={overlayClass} id="player-auth-overlay">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <h3>Please login to watch.</h3>
                <h4>Awaiting authorization check.</h4>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    userAuthenticated: state.auth.userAuthenticated
});

export default connect(mapStateToProps)(VideoPlayer);