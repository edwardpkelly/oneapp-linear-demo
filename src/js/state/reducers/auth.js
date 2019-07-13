import AuthConstants from '../../constants/auth-constants';

const auth = (state = {}, action) => {
    switch (action.type) {
        case AuthConstants.ENTITLEMENT_LOADED :
            console.log(state);
            return {
                ...state,
                entitlementLoaded: true
            }
    }
    return state;
};

export default auth;