import UserConstants from '../../constants/user-constants';

const user = (state = {}, action) => {
    switch (action.type) {
        case UserConstants.SELECTED_MVPD_UPDATED :
            const { mvpd } = action.data;
            return state
    }
    return state;
};

export default user;