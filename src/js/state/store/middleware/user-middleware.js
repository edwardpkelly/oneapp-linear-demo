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
            const { data } = action;
            $(document).trigger({ type: UserConstants.SIGN_IN_BTN_SELECTED, data });
            break;
        }

        case UserConstants.WATCH_BTN_SELECTED : {
            const { data } = action;
            $(document).trigger({ type: UserConstants.WATCH_BTN_SELECTED, data });
            break;
        }
    }
};

export default UserMiddleware;
