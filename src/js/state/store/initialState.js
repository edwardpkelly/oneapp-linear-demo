const defaultState = {
    auth: {
        authenticatedMvpdId: null,
        userAuthenticated: null,
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
            callsign: null,
            cpc_config: null,
            requestor: null
        }
    }
};

export default (mediaItems = []) => {
    defaultState.media.mediaItems = mediaItems;
    return defaultState;
};