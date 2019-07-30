function loadNBC() {
    var contentInitObj = new NBCUniCPC.ContentInitializationObject();
    var params = { "autoPlay": true, "mParticleId": "595844347038223836", "appSessionId": "8A56A219-FD69-49A2-9D3B-42DF28887F84", "pageAppVersion": "1.133.33" };
    params.mvpdId = selectedMvpdId;
    contentInitObj.videoId = "LIVE";
    authRequestorId = findBrandData('nbc').requestor;
    NBCUniCPC.controller.updateLiveEvent("videoplayer", NBCUniCPC.Account.NBC_STAGE, contentInitObj, params);
    smoothScroll();
    updateElements('nbc');
}

function loadUSA() {
    var contentInitObj = new NBCUniCPC.ContentInitializationObject();
    var params = { "autoPlay": true, "mParticleId": "595844347038223836", "appSessionId": "8A56A219-FD69-49A2-9D3B-42DF28887F84", "pageAppVersion": "1.133.33" };
    params.mvpdId = selectedMvpdId;
    contentInitObj.videoId = "LIVE";
    authRequestorId = findBrandData('usa').requestor;
    NBCUniCPC.controller.updateLiveEvent("videoplayer", NBCUniCPC.Account.USA_ONEAPP_STAGE, contentInitObj, params);
    smoothScroll();
    updateElements('usa');
}

function loadSyfy() {
    var contentInitObj = new NBCUniCPC.ContentInitializationObject();
    var params = { "autoPlay": true, "mParticleId": "595844347038223836", "appSessionId": "8A56A219-FD69-49A2-9D3B-42DF28887F84", "pageAppVersion": "1.133.33" };
    params.mvpdId = selectedMvpdId;
    contentInitObj.videoId = "LIVE";
    authRequestorId = findBrandData('syfy').requestor;
    NBCUniCPC.controller.updateLiveEvent("videoplayer", NBCUniCPC.Account.SYFY_ONEAPP_STAGE, contentInitObj, params);
    smoothScroll();
    updateElements('syfy');
}

function loadCNBC() {
    var contentInitObj = new NBCUniCPC.ContentInitializationObject();
    var params = { "autoPlay": true, "mParticleId": "595844347038223836", "appSessionId": "8A56A219-FD69-49A2-9D3B-42DF28887F84", "pageAppVersion": "1.133.33" };
    params.mvpdId = selectedMvpdId;
    contentInitObj.videoId = "LIVE";
    authRequestorId = findBrandData('cnbc').requestor;
    NBCUniCPC.controller.updateLiveEvent("videoplayer", NBCUniCPC.Account.CNBC_ONEAPP_STAGE, contentInitObj, params);
    smoothScroll();
    updateElements('cnbc');
}

function loadMSNBC() {
    var contentInitObj = new NBCUniCPC.ContentInitializationObject();
    var params = { "autoPlay": true, "mParticleId": "595844347038223836", "appSessionId": "8A56A219-FD69-49A2-9D3B-42DF28887F84", "pageAppVersion": "1.133.33" };
    params.mvpdId = selectedMvpdId;
    contentInitObj.videoId = "LIVE";
    authRequestorId = findBrandData('msnbc').requestor;
    NBCUniCPC.controller.updateLiveEvent("videoplayer", NBCUniCPC.Account.MSNBC_ONEAPP_STAGE, contentInitObj, params);
    smoothScroll();
    updateElements('msnbc');
}

function loadE() {
    var contentInitObj = new NBCUniCPC.ContentInitializationObject();
    var params = { "autoPlay": true, "mParticleId": "595844347038223836", "appSessionId": "8A56A219-FD69-49A2-9D3B-42DF28887F84", "pageAppVersion": "1.133.33" };
    params.mvpdId = selectedMvpdId;
    contentInitObj.videoId = "LIVE";
    authRequestorId = findBrandData('e').requestor;
    NBCUniCPC.controller.updateLiveEvent("videoplayer", NBCUniCPC.Account.E_ONEAPP_STAGE, contentInitObj, params);
    smoothScroll();
    updateElements('e');
}

function loadUniverso() {
    var contentInitObj = new NBCUniCPC.ContentInitializationObject();
    var params = { "autoPlay": true, "mParticleId": "595844347038223836", "appSessionId": "8A56A219-FD69-49A2-9D3B-42DF28887F84", "pageAppVersion": "1.133.33" };
    params.mvpdId = selectedMvpdId;
    contentInitObj.videoId = "LIVE";
    authRequestorId = findBrandData('nbcuniverso').requestor;
    NBCUniCPC.controller.updateLiveEvent("videoplayer", NBCUniCPC.Account.NBCUNIVERSO_ONEAPP_STAGE, contentInitObj, params);
    smoothScroll();
    updateElements('nbcuniverso');
}

function loadBravo() {
    var contentInitObj = new NBCUniCPC.ContentInitializationObject();
    var params = { "autoPlay": true, "mParticleId": "595844347038223836", "appSessionId": "8A56A219-FD69-49A2-9D3B-42DF28887F84", "pageAppVersion": "1.133.33" };
    params.mvpdId = selectedMvpdId;
    contentInitObj.videoId = "LIVE";
    authRequestorId = findBrandData('bravo').requestor;
    NBCUniCPC.controller.updateLiveEvent("videoplayer", NBCUniCPC.Account.BRAVO_ONEAPP_STAGE, contentInitObj, params);
    smoothScroll();
    updateElements('bravo');
}

function loadOxygen() {
    var contentInitObj = new NBCUniCPC.ContentInitializationObject();
    var params = { "autoPlay": true, "mParticleId": "595844347038223836", "appSessionId": "8A56A219-FD69-49A2-9D3B-42DF28887F84", "pageAppVersion": "1.133.33" };
    params.mvpdId = selectedMvpdId;
    contentInitObj.videoId = "LIVE";
    authRequestorId = findBrandData('oxygen').requestor;
    NBCUniCPC.controller.updateLiveEvent("videoplayer", NBCUniCPC.Account.OXYGEN_ONEAPP_STAGE, contentInitObj, params);
    smoothScroll();
    updateElements('oxygen');
}