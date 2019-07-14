import AuthConstants from '../../constants/auth-constants';
import UserConstants from '../../constants/user-constants';

const auth = (state = {}, action) => {
    switch (action.type) {
        case AuthConstants.ENTITLEMENT_LOADED :
            return {
                ...state,
                entitlementLoaded: true
            }
        
        case UserConstants.AUTH_BTN_SELECTED :{
            const { mvpd } = action.data;
            return {
                ...state,
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