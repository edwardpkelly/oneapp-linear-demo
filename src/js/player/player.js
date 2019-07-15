let windowObj = window || {};
let cpcplayer;
let playerInited = false;

const onReady = event => {
    cpcplayer.removeEventListener(NBCUniCPC.Event.PLAYBACK_READY, onReady);

    cpcplayer.setToken(encodedAuthorizationToken, "authToken");
    cpcplayer.play();
}

const onConfigLoaded = evt => {
    NBCUniCPC.controller.removeEventListener(NBCUniCPC.Event.CONFIG_LOADED, onConfigLoaded);
    let contentInitObj = new NBCUniCPC.ContentInitializationObject();
    contentInitObj.videoId = NBCUniCPC.StreamType.LIVE;
    let parameters = new NBCUniCPC.PlayerParameters();
    parameters.autoPlay = false;
    parameters.mvpdId = selectedMvpdId;
    parameters.callsign = "usawest";

    cpcplayer = NBCUniCPC.controller.loadEvent("videoplayer", NBCUniCPC.Account[DEFAULT_BRAND.config], contentInitObj, parameters);
    cpcplayer.addEventListener(NBCUniCPC.Event.PLAYBACK_READY, onReady);

    // TODO : Update UI buttons
    //updateUiWithAuthStatus();
    //updateElements(DEFAULT_BRAND.data);
}

const loadPlayer = () => {
    if (playerInited) return;
    if (windowObj.encodedAuthorizationToken) {
        playerInited = true;
        NBCUniCPC.controller.addEventListener(NBCUniCPC.Event.CONFIG_LOADED, onConfigLoaded);
        NBCUniCPC.controller.loadConfig("desktop_onsite_oneapp_stage");
    }
}

NBCUniCPC.DEFAULT_LOG_LEVEL = NBCUniCPC.LogLevel.ALL; // verbose logging for demonstration purposes
NBCUniCPC.setServerUrl("https://ws-cloudpath-stage.media.nbcuni.com"); // temporarily set service environment to qa until configs are available in prod
NBCUniCPC.onReady = loadPlayer; // define the onReady callback in case CPC is not ready
if (NBCUniCPC.ready) loadPlayer(); // load the player if CPC is ready.


export {
    loadPlayer
}