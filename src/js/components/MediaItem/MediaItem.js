import React from 'react';
import AuthConstants from '../../constants/auth-constants';
import MediaButtonComponent from './MediaButtonComponent';
import SignInButton from './SignInButton';

const MediaItem = props => {
    
    const {
        name,
        displayName,
        callsigns,
        userAuthenticated
    } = props;

    const imgUrl = `images/${name}.png`;

    return (
        <div className="col-lg-4 col-md-6">
            <div className="card mb-4 shadow-sm">
                <img className="card-img-top" src={imgUrl} alt={displayName} />
                <div className="card-body">
                {
                    (userAuthenticated !== AuthConstants.NOT_AUTHENTICATED) ? 
                        <MediaButtonComponent callsigns={callsigns} /> : <SignInButton />
                }
                </div>
            </div>
        </div>
    )
};

export default MediaItem;