import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
    authButtonSelected
} from '../state/actions/user-actions';

const AuthControl = props => {

    return (
        <Fragment>
            <select className="form-control mr-sm-3" id="mvpd-select">
                <option value="nothing">Select your provider</option>
                <option value="nothing">Waiting for list ...</option>
            </select>
            <button className="btn btn-outline-warning my-2 my-sm-0" onClick={props.authButtonSelected} id="toggle-auth-btn">Login</button>
        </Fragment>
    );
}

const mapDispatchToProps = {
    authButtonSelected
};

export default connect(null, mapDispatchToProps)(AuthControl);