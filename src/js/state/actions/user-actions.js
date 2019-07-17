import UserConstants from '../../constants/user-constants';

export const authButtonSelected = () => ({
    type: UserConstants.AUTH_BTN_SELECTED
});

export const selectedMvdUpdated = data => ({
    type: UserConstants.SELECTED_MVPD_UPDATED,
    data
});

export const signInButtonSelected = () => ({
    type: UserConstants.SIGN_IN_BTN_SELECTED
});

export const watchButtonSelected = data => ({
    type: UserConstants.WATCH_BTN_SELECTED,
    data
});