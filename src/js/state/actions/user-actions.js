import UserConstants from '../../constants/user-constants';

export const authButtonSelected = (data) => ({
    type: UserConstants.AUTH_BTN_SELECTED,
    data
});

export const selectedMvdUpdated = (data) => ({
    type: UserConstants.SELECTED_MVPD_UPDATED,
    data
});
