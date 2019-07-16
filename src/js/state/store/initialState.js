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
    }
};

export default (mediaItems = []) => {
    defaultState.media.mediaItems = mediaItems;
    return defaultState;
};