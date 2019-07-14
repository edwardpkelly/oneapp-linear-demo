import UserConstants from '../../../constants/user-constants';

const UserMiddleware = store => next => action => {
    next(action);

    switch(action.type) {
        case UserConstants.AUTH_BTN_SELECTED :
            console.log('AUTH_BTN_SELECTED');
            break;
    }
};

export default UserMiddleware;
