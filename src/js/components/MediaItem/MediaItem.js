import React from 'react';
import AuthConstants from '../../constants/auth-constants';
import MediaButtonComponent from './MediaButtonComponent';
import SignInButton from './SignInButton';

const MediaItem = props => {

    const {
        name,
        displayName,
        callsigns,
        isSelectedItem,
        currentCallsign,
        userAuthenticated,
        handleWatchBtnClick,
        handleSignInBtnClick
    } = props;

    const imgUrl = `images/${name}.png`;
    let cardClass = 'card mb-4 shadow-sm';
    let headerClass = 'card-header text-center';

    if (isSelectedItem) cardClass += ' border-danger';
    if (isSelectedItem) headerClass += ' text-white bg-danger border-danger';
    
    const gutterText = (isSelectedItem) ? 
                        'Watching NOW' :
                        (callsigns.length) ? 'Choose a location:' : null;

    return (
        <div className="col-lg-4 col-md-6">
            <div className={cardClass}>
                <h5 className={headerClass}>{displayName}</h5>
                <img className="card-img-top" src={imgUrl} alt={displayName} />
                <div className="card-body">
                    {
                        (userAuthenticated !== AuthConstants.NOT_AUTHENTICATED) ?
                            <div className="d-flex justify-content-between align-items-center">
                                <small>
                                    {gutterText}
                                </small>
                                <div className="btn-group">

                                    <MediaButtonComponent
                                        name={name}
                                        currentCallsign={currentCallsign}
                                        isSelectedItem={isSelectedItem}
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