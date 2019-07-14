const defaultState = {
    auth: {
        entitlementLoaded: false,
        auth: false,
        selectedMvpdId: null,
        authenticatedMvpdId: null
    }
};

export default () => {
    return defaultState;
};