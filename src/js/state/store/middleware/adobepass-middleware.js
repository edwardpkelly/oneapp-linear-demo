import AuthConstants from '../../../constants/auth-constants';

const AdobePassMiddleware = store => next => action => {
    next(action);
    switch(action.type) {
        case AuthConstants.ENTITLEMENT_LOADED :
            
        break;
    }
};

export default AdobePassMiddleware;