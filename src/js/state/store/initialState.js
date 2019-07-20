import AuthConstants from '../../constants/auth-constants';

const defaultState = {
    auth: {
        authenticatedMvpdId: null,
        userAuthenticated: AuthConstants.NOT_AUTHENTICATED,
        entitlementLoaded: false,
        mvpdList: [],
        selectedMvpdId: null,
    },
    media: {
        mediaItems: []
    },
    player: {
        currentMediaItem: {
            brand: null,
            callsignData: {label: '', data: ''},
            cpc_config: null,
            displayName: "",
            requestor: null
        }
    }
};

export default (mediaItems = []) => {
    defaultState.media.mediaItems = mediaItems;
    return defaultState;
};