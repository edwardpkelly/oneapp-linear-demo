import UserConstants from '../../../constants/user-constants';

const UserMiddleware = store => next => action => {
    next(action);

    switch (action.type) {
        case UserConstants.AUTH_BTN_SELECTED:
            const { mvpd } = action.data;
            $(document).trigger({ type: UserConstants.AUTH_BTN_SELECTED, mvpd });
            break;
    }
};

export default UserMiddleware;
