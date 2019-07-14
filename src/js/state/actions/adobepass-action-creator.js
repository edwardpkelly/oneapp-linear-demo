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

export {
    adobePassActionCreator
};