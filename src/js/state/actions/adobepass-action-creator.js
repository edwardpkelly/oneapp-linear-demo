import AuthConstants from '../../constants/auth-constants';
import { onEntitlementLoaded, onSetConfig, onAuthenticationStatus } from './adobepass-actions';

const adobePassActionCreator = store => {
    const handleAuthEvents = event => {
        switch (event.type) {
            case AuthConstants.ENTITLEMENT_LOADED:
                store.dispatch(onEntitlementLoaded());
                break;

            case AuthConstants.ON_AUTHENTICATION_STATUS:
                store.dispatch(onAuthenticationStatus(event.auth));
                break;

            case AuthConstants.ON_SET_CONFIG: {
                const { mvpdList } = event;
                store.dispatch(onSetConfig(mvpdList));
                break;
            }
        }
    };

    $(document).on(AuthConstants.ON_AUTHENTICATION_STATUS, handleAuthEvents);
    $(document).on(AuthConstants.ENTITLEMENT_LOADED, handleAuthEvents);
    $(document).on(AuthConstants.ON_SET_CONFIG, handleAuthEvents);
};

export {
    adobePassActionCreator
};