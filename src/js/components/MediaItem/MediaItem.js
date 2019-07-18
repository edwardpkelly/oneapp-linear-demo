import React from 'react';
import AuthConstants from '../../constants/auth-constants';
import MediaButtonComponent from './MediaButtonComponent';
import SignInButton from './SignInButton';

const MediaItem = props => {

    const {
        name,
        displayName,
        callsigns,
        userAuthenticated,
        handleWatchBtnClick,
        handleSignInBtnClick
    } = props;

    const imgUrl = `images/${name}.png`;

    return (
        <div className="col-lg-4 col-md-6">
            <div className="card mb-4 shadow-sm">
                <h5 className="card-header text-center">{displayName}</h5>
                <img className="card-img-top" src={imgUrl} alt={displayName} />
                <div className="card-body">
                    {
                        (userAuthenticated !== AuthConstants.NOT_AUTHENTICATED) ?
                            <div className="d-flex justify-content-between align-items-center">
                                <small>
                                    {
                                        callsigns.length ? 'Choose a location:' : null
                                    }
                                </small>
                                <div className="btn-group">

                                    <MediaButtonComponent
                                        name={name}
                                        label={displayName}
                                        callsigns={callsigns}
                                        handleWatchBtnClick={handleWatchBtnClick}
                                    />
                                </div>
                            </div> : <SignInButton handleSignInBtnClick={handleSignInBtnClick} />
                    }
                </div>
            </div>
        </div>
    )
};

export default MediaItem;