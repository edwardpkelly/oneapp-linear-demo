import UserConstants from '../constants/user-constants';
import findBrandData from '../utils/findBrandData';
import scrollTop from '../utils/ui/smoothScroll';
import PlayerConstants from '../constants/player-constants';

let windowObj = window || {};
let cpcplayer;
let playerInited = false;

$(document).on(UserConstants.SIGN_IN_BTN_SELECTED, () => {
    scrollTop('main-content');
});

$(document).on(UserConstants.WATCH_BTN_SELECTED, ({ eventObject }) => {
    scrollTop('main-content');
    const { brand, callsign } = eventObject;
    const mediaItem = findBrandData(brand);
    loadMediaItem(mediaItem, callsign);
});

const dispatchUpdateMediaEVent = (media, callsign = {}) => {
    if (!media) return;
    const currentItem = {
        ...media,
        callsign
    }
    $(document).trigger({ type: PlayerConstants.ON_MEDIA_ITEM_UPDATED, eventObject: { currentMediaItem: currentItem } });
};

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
    let callsignData = {};

    if (DEFAULT_BRAND.callsign) {
        parameters.callsign = DEFAULT_BRAND.callsign;
        callsignData = DEFAULT_BRAND.callsigns.find(item => {
            return item.data === DEFAULT_BRAND.callsign;
        });
    }
    parameters.autoPlay = false;
    parameters.mvpdId = selectedMvpdId;

    cpcplayer = NBCUniCPC.controller.loadEvent("videoplayer", NBCUniCPC.Account[DEFAULT_BRAND.cpc_config], contentInitObj, parameters);
    cpcplayer.addEventListener(NBCUniCPC.Event.PLAYBACK_READY, onReady);

    dispatchUpdateMediaEVent(DEFAULT_BRAND, callsignData);
}

const loadPlayer = () => {
    if (playerInited) return;
    if (windowObj.encodedAuthorizationToken) {
        playerInited = true;
        NBCUniCPC.controller.addEventListener(NBCUniCPC.Event.CONFIG_LOADED, onConfigLoaded);
        NBCUniCPC.controller.loadConfig("desktop_onsite_oneapp_stage");
    }
}

const loadMediaItem = (mediaItem, callsign) => {
    let contentInitObj = new NBCUniCPC.ContentInitializationObject();
    let callsignData = {};
    const { params, cpc_config, requestor } = mediaItem;

    params.mvpdId = selectedMvpdId;
    if (callsign) {
        params.callsign = callsign;
        callsignData = mediaItem.callsigns.find(item => {
            return item.data === callsign;
        });
    }
    contentInitObj.videoId = "LIVE";
    windowObj.authRequestorId = requestor;
    NBCUniCPC.controller.updateLiveEvent("videoplayer", NBCUniCPC.Account[cpc_config], contentInitObj, params);

    dispatchUpdateMediaEVent(mediaItem, callsignData);
}

NBCUniCPC.DEFAULT_LOG_LEVEL = NBCUniCPC.LogLevel.ALL; // verbose logging for demonstration purposes
NBCUniCPC.setServerUrl("https://ws-cloudpath-stage.media.nbcuni.com"); // temporarily set service environment to qa until configs are available in prod
NBCUniCPC.onReady = loadPlayer; // define the onReady callback in case CPC is not ready
if (NBCUniCPC.ready) loadPlayer(); // load the player if CPC is ready.


export {
    loadPlayer
}