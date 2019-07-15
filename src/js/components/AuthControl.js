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
        authenticatedMvpdId
    } = auth;

    const handleAuthClick = () => {
        authButtonSelected();
    };

    const onUpdateSelection = (event) => {
        const selectedMvpd = event.target.value;
        if (selectedMvpd === 'nothing') return;
        selectedMvdUpdated({ mvpd: selectedMvpd });
    };

    //$('#mvpd-select').val(selectedMvpdId);
    //$('#mvpd-select').attr('disabled', true);
    //$('#toggle-auth-btn').html('Logout');
    //$('#toggle-auth-btn').toggleClass('btn-outline-warning', false);
    //$('#toggle-auth-btn').toggleClass('btn-danger', true);
    let btnClass = 'btn my-2 my-sm-0 ';
    if (authenticatedMvpdId) {
        btnClass += 'btn-danger';
    } else {
        btnClass += 'btn-outline-warning';
    }

    return (
        <Fragment>
            <select 
                value={authenticatedMvpdId} 
                className="form-control mr-sm-3" 
                onChange={(event) => onUpdateSelection(event)}
            >
                {
                    !mvpdList.length ?
                        <option key="002" value="nothing">Waiting for list ...</option>
                        : null
                }
                <option key="001" value="nothing">Select your provider...</option>
                {
                    mvpdList.map(item => {
                        return (
                            <option
                                key={item.mvpdId} 
                                value={item.mvpdId} 
                                title={item.mvpdId}
                            >
                                {item.displayName}
                            </option>
                        )
                    })
                }
                }
            </select>
            <button 
                className={btnClass} 
                onClick={handleAuthClick} 
                id="toggle-auth-btn"
                >
                    { authenticatedMvpdId ? 'Logout' : 'Login' }
                </button>
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