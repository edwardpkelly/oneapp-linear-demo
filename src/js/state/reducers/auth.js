import AuthConstants from '../../constants/auth-constants';
import UserConstants from '../../constants/user-constants';

const auth = (state = {}, action) => {
    switch (action.type) {
        case AuthConstants.ENTITLEMENT_LOADED :
            return {
                ...state,
                entitlementLoaded: true
            }

        case AuthConstants.ON_AUTHENTICATION_STATUS :
            const { data: auth } = action;
            return {
                ...state,
                userAuthenticated: auth
            }
        case AuthConstants.ON_SET_CONFIG : {
            const { data } = action;
            const obj = {
                ...state,
                mvpdList: data
            }
            return obj;
        }

        case AuthConstants.ON_SET_SELECTED_PROVIDER : {
            const { data } = action;
            const { mvpd } = data;
            return {
                ...state,
                authenticatedMvpdId: mvpd,
                selectedMvpdId: mvpd
            }
        }

        case UserConstants.SELECTED_MVPD_UPDATED : {
            const { mvpd } = action.data;
            return {
                ...state,
                selectedMvpdId: mvpd
            }
        }
    }
    return state;
};

export default auth;