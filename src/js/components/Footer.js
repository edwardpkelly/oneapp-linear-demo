import React from 'react';
import '../../css/Footer.css';

const Footer = (props) => {
    return (
        <footer className="Footer fixed-bottom mt-auto py-3 adobe-pass-warning">
            <div className="container">
                <span className="text-muted" id="auth-status-footer">Adobe Pass: Checking entitlement status.</span>
            </div>
        </footer>
    )
};

export default Footer;