import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
    authButtonSelected,
    selectedMvdUpdated
} from '../state/actions/user-actions';

const AuthControl = props => {

    const { 
        authButtonSelected, 
        selectedMvpdId, 
        authenticatedMvpdId,
        selectedMvdUpdated } = props;
        
    let selectedMvpd;

    const handleAuthClick = () => {
        if (selectedMvpd === 'nothing') return;
        authButtonSelected({ mvpd: selectedMvpd });
    };

    const onUpdateSelection = (event) => {
        selectedMvpd = event.target.value;
        selectedMvdUpdated({ mvpd: selectedMvpd });
    };

    return (
        <Fragment>
            <select className="form-control mr-sm-3" id="mvpd-select" onChange={(event) => onUpdateSelection(event)}>
                <option value="nothing">Select your provider</option>
                <option value="nothing">Waiting for list ...</option>
            </select>
            <button className="btn btn-outline-warning my-2 my-sm-0" onClick={handleAuthClick} id="toggle-auth-btn">Login</button>
        </Fragment>
    );
}

const mapDispatchToProps = {
    authButtonSelected,
    selectedMvdUpdated
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthControl);