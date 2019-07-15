import React from 'react';
import { connect } from 'react-redux';
import {
    onAuthenticationStatus
} from '../state/actions/adobepass-actions';

import '../../css/Footer.css';

const Footer = (props) => {

    const { auth } = props;
    const {
        userAuthenticated
    } = auth;

    const notAuthBtnTxt = 'Not Authenticated. Please login.';
    const notAuthBtnClass = 'badge badge-danger';
    let footerClass = 'Footer fixed-bottom mt-auto py-3 ';
    if (userAuthenticated === null) footerClass += 'adobe-pass-warning';
    else if (userAuthenticated === false) footerClass += 'adobe-pass-failure';
    else footerClass += 'adobe-pass-success';

    return (
        <footer className={footerClass}>
            <div className="container">
                <span className="text-muted" id="auth-status-footer">
                    {
                        userAuthenticated === null ? 'Adobe Pass: Checking entitlement status.' : null
                    }
                </span>
                {
                    userAuthenticated !== null ? <span className={notAuthBtnClass}>{notAuthBtnTxt}</span> : null
                }
            </div>
        </footer>
    )
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Footer);