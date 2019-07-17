import React from 'react';

const SignInButton = props => {
    const {
        callsign,
        handleSignInBtnClick
    } = props;

    return (
        <button
            type="button"
            className="btn btn-lg btn-block btn-primary btn-watch-now"
            onClick={handleSignInBtnClick}
        >
            Sign-in to Watch {callsign}
        </button>
    )
};

export default SignInButton;