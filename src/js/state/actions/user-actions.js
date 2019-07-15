import UserConstants from '../../constants/user-constants';

export const authButtonSelected = () => ({
    type: UserConstants.AUTH_BTN_SELECTED
});

export const selectedMvdUpdated = (data) => ({
    type: UserConstants.SELECTED_MVPD_UPDATED,
    data
});
