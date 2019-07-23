import UserConstants from '../../../constants/user-constants';

const UserMiddleware = store => next => action => {
    next(action);

    switch (action.type) {
        case UserConstants.AUTH_BTN_SELECTED:
            const { auth } = store.getState();
            const { selectedMvpdId: mvpd } = auth;
            $(document).trigger({ type: UserConstants.AUTH_BTN_SELECTED, mvpd });
            break;

        case UserConstants.SIGN_IN_BTN_SELECTED : {
            $(document).trigger({ type: UserConstants.SIGN_IN_BTN_SELECTED });
            break;
        }

        case UserConstants.WATCH_BTN_SELECTED : {
            const { data } = action;
            const {
                brand,
                callsign
            } = data;
            $(document).trigger({ type: UserConstants.WATCH_BTN_SELECTED, eventObject: {brand, callsign} });
            break;
        }
    }
};

export default UserMiddleware;
