import AuthConstants from '../../constants/auth-constants';

export const onEntitlementLoaded = data => ({
    type: AuthConstants.ENTITLEMENT_LOADED,
    data
});