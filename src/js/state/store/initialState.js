const defaultState = {
    auth: {
        authenticatedMvpdId: null,
        userAuthenticated: null,
        entitlementLoaded: false,
        mvpdList: [],
        selectedMvpdId: null,
    }
};

export default () => {
    return defaultState;
};