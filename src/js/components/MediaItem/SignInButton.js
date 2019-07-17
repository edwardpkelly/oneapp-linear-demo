import React from 'react';

const SignInButton = props => {
    const { callsign } = props;

    return (
        <button
            type="button" 
            className="btn btn-lg btn-block btn-primary btn-watch-now"
        >
            Sign-in to Watch {callsign}
        </button>
    )
};

export default SignInButton;