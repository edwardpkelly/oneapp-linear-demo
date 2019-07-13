import AuthConstants from '../../constants/auth-constants';
import { onEntitlementLoaded } from './adobepass-actions';

const adobePassActionCreator = store => {
    const handleAuthEvents = event => {
        switch (event.type) {
            case AuthConstants.ENTITLEMENT_LOADED:
                store.dispatch(onEntitlementLoaded());
                break;
        }
    };

    $(document).on(AuthConstants.ENTITLEMENT_LOADED, handleAuthEvents);
};

window.entitlementLoaded = () => {
    // kicks off entitlement flow
    accessEnabler.setRequestor(window.DEFAULT_BRAND.requestor, null);
    $(document).trigger(AuthConstants.ENTITLEMENT_LOADED);
};

export {
    adobePassActionCreator
};