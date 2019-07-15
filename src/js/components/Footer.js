import React from 'react';
import { connect } from 'react-redux';
import AuthConstants from '../constants/auth-constants';

import '../../css/Footer.css';

const Footer = (props) => {

    const { auth } = props;
    const {
        userAuthenticated
    } = auth;

    let badgeLabel = 'Not Authenticated';
    let badgeClass = 'badge badge-danger';
    let footerClass = 'Footer fixed-bottom mt-auto py-3 ';

    if (userAuthenticated === null) {
        footerClass += 'adobe-pass-warning';
    } else if (userAuthenticated === AuthConstants.NOT_AUTHENTICATED) {
        footerClass += 'adobe-pass-failure';
    } else if (userAuthenticated === AuthConstants.TEMP_PASS) {
        badgeLabel = 'Temp Pass Active';
        badgeClass = 'badge badge-warning';
        footerClass += 'adobe-pass-warning';
    } else if (userAuthenticated === AuthConstants.LOGGING_OUT_ADOBE_PASS) {
        badgeLabel = 'Logging Out';
        badgeClass = 'badge badge-danger';
        footerClass += 'adobe-pass-warning';
    } else {
        badgeLabel = 'User Authenticated';
        badgeClass = 'badge badge-success';
        footerClass += 'adobe-pass-success';
    }

    return (
        <footer className={footerClass}>
            <div className="container">
                <span className="text-muted" id="auth-status-footer">
                    {
                        userAuthenticated === null ? 'Adobe Pass: Checking entitlement status.' : null
                    }
                </span>
                {
                    userAuthenticated !== null ? <span className={badgeClass}>{badgeLabel}</span> : null
                }
            </div>
        </footer>
    )
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Footer);