import AuthConstants from '../../constants/auth-constants';

export const onAuthenticationStatus = data => ({
    type: AuthConstants.ON_AUTHENTICATION_STATUS,
    data
});

export const onEntitlementLoaded = data => ({
    type: AuthConstants.ENTITLEMENT_LOADED,
    data
});

export const onSetConfig = data => ({
    type: AuthConstants.ON_SET_CONFIG,
    data
});

export const onSetSelectedProvider = (data) => ({
    type: AuthConstants.ON_SET_SELECTED_PROVIDER,
    data
});