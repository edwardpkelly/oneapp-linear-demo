import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import {
    authButtonSelected,
    selectedMvdUpdated
} from '../state/actions/user-actions';

const AuthControl = props => {

    const {
        auth,
        authButtonSelected,
        selectedMvdUpdated
    } = props;

    const {
        mvpdList,
        selectedMvpdId,
        authenticatedMvpdId
    } = auth;

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
                {
                    !mvpdList.length ?
                        <option key="002" value="nothing">Waiting for list ...</option>
                        : null
                }
                <option key="001" value="nothing">Select your provider...</option>
                {
                    mvpdList.map(item => {
                        return <option key={item.mvpdId} value={item.mvpdId} title={item.mvpdId}>{item.displayName}</option>
                    })
                }
        }
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

AuthControl.defaultProps = {
    auth: {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthControl);