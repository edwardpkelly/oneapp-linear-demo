function log(e) {
    console.log('%c[PAGE LEVEL AUTH EXAMPLE]' + e, 'background: #FFFF00;');
}

var cpcplayer, encodedAuthorizationToken, selectedMvpdId;
var playerInited = false;

//PLAYBACK_READY event handler
function onReady(event) {
    cpcplayer.removeEventListener(NBCUniCPC.Event.PLAYBACK_READY, onReady);

    cpcplayer.setToken(encodedAuthorizationToken, "authToken");
    cpcplayer.play();
}

function onConfigLoaded(evt) {
    NBCUniCPC.controller.removeEventListener(NBCUniCPC.Event.CONFIG_LOADED, onConfigLoaded);
    var contentInitObj = new NBCUniCPC.ContentInitializationObject();
    contentInitObj.videoId = NBCUniCPC.StreamType.LIVE;
    var parameters = new NBCUniCPC.PlayerParameters();
    parameters.autoPlay = false;
    parameters.mvpdId = selectedMvpdId;
    parameters.callsign = "usawest";

    cpcplayer = NBCUniCPC.controller.loadEvent("videoplayer", NBCUniCPC.Account[DEFAULT_BRAND.config], contentInitObj, parameters);
    cpcplayer.addEventListener(NBCUniCPC.Event.PLAYBACK_READY, onReady);
    updateUiWithAuthStatus();
    updateElements(DEFAULT_BRAND.data);
}

function loadPlayer() {
    if (encodedAuthorizationToken) {
        playerInited = true;
        NBCUniCPC.controller.addEventListener(NBCUniCPC.Event.CONFIG_LOADED, onConfigLoaded);
        NBCUniCPC.controller.loadConfig("desktop_onsite_oneapp_stage");
    }
}

NBCUniCPC.DEFAULT_LOG_LEVEL = NBCUniCPC.LogLevel.ALL; // verbose logging for demonstration purposes
NBCUniCPC.setServerUrl("https://ws-cloudpath-stage.media.nbcuni.com"); // temporarily set service environment to qa until configs are available in prod
NBCUniCPC.onReady = loadPlayer; // define the onReady callback in case CPC is not ready
if (NBCUniCPC.ready) loadPlayer(); // load the player if CPC is ready.

// Authentication/authorization example
var authParams = new function () {
    this.AUTHENTICATED = "authenticated";
    this.NOT_AUTHENTICATED = "notAuthenticated";
    this.LOGOUT_ADOBE_PASS = "logoutAdobePass";
    this.provider;
    this.authN;
    this.authZ;
};

function updateAuthForm(state) {
    $('#auth-form').removeClass();

    switch (state) {
        case authParams.AUTHENTICATED:
            $('#auth-status-footer').html('Adobe Pass: <span class="badge badge-success">User Authenticated</span>');
            $('.footer').toggleClass('adobe-pass-failue', false);
            $('.footer').toggleClass('adobe-pass-warning', false);
            $('.footer').toggleClass('adobe-pass-success', true);
            break;

        case authParams.NOT_AUTHENTICATED:
            $('#auth-status-footer').html('Adobe Pass: <span class="badge badge-danger">Not Authenticated. Please login.</span>');
            $('.footer').toggleClass('adobe-pass-failue', true);
            $('.footer').toggleClass('adobe-pass-warning', false);
            $('.footer').toggleClass('adobe-pass-success', false);
            break;

        case authParams.TEMP_PASS:
            $('#auth-status-footer').html('Adobe Pass: <span class="badge badge-success">Using Temp Pass</span>');
            $('.footer').toggleClass('adobe-pass-failue', false);
            $('.footer').toggleClass('adobe-pass-warning', true);
            $('.footer').toggleClass('adobe-pass-success', false);
            break;

        case authParams.LOGOUT_ADOBE_PASS:
            $('#auth-status-footer').html('Adobe Pass: Logging Out.');
            $('.footer').toggleClass('adobe-pass-failue', false);
            $('.footer').toggleClass('adobe-pass-warning', true);
            $('.footer').toggleClass('adobe-pass-success', false);
            break;

        default:
            log("Unknown state " + state + " for updateAuthForm");
    }
}

function toggleAuth() {
    var mvpd = $('#mvpd-select').val();
    var btnStatus = $('#toggle-auth-btn').html();
    if (accessEnabler) {
        if (btnStatus == 'Logout') {
            logoutAdobePass();
        } else if (mvpd !== "nothing") {
            accessEnabler.setSelectedProvider(mvpd);
        }
    } else {
        alert('Warning: Unable to authenticate user.');
    }
};

function logoutAdobePass() {
    accessEnabler.logout();
    location.reload();
};

// BEGIN ADOBE PASS INTEGRATION EXAMPLE
var MVPD_IFRAME_CONTAINER_ID = "mvpddiv";
var MVPD_IFRAME_ID = "mvpdframe";
var authRequestorId = DEFAULT_BRAND.requestor;
$("#requestorIdLabel").html("<span class='infoValue'>" + authRequestorId + "</span>");

function entitlementLoaded() {
    accessEnabler.setRequestor(authRequestorId, null); // kicks off entitlement flow

    $('#toggle-auth-btn').on('click', function() {
        toggleAuth();
    });
}

/* *
 * Triggered by: setProviderDialogURL(), getAuthentication(), getAuthorization()
 * @param {array} providers - An array of Objects representing the requested
 * MVPDs: ` var mvpd = {ID: "someprov",displayName: "Some Provider",logoURL: "http://www.someprov.com/images/logo.jpg"} `
 */
function displayProviderDialog(providers) {
    log("displayProviderDialog::providers:" + JSON.stringify(providers));
    updateAuthForm(authParams.NOT_AUTHENTICATED);
}

/* *
 * ​Trigger:  checkAuthorization() and getAuthorization() after a successful
 * authorization to view a resource.
 *
 * @param {type} resource - the content that the user is authorized to view.
 * @param {type} token - the short-lived media token
 */
function setToken(resource, token) {
    log("setToken::resource:" + JSON.stringify(resource));
    log("setToken::token:" + JSON.stringify(token));
    encodedAuthorizationToken = encodeURIComponent(token);

    // load the player only once
    if (!playerInited) {
        loadPlayer(); // load the player now that the user has authorization
    }
}

/* *
 * ​Trigger: checkAuthorization() and getAuthorization() after an unsuccessful authorization.
 * @param {type} resource - the content that the user was attempting to view
 * @param {type} code - the error code indicating what type of failure
 * occurred
 * @param {type} description - describes the error associated with the error
 * code
 */
function tokenRequestFailed(resource, code, description) {
    log("tokenRequestFailed::resource:" + JSON.stringify(resource));
    log("tokenRequestFailed::code:" + JSON.stringify(code));
    log("tokenRequestFailed::description:" + JSON.stringify(description));
}

/* *
 * Trigger: checkAuthentication(), getAuthentication(), checkAuthorization()
 *
 * Called upon completion of a checkAuthentication() request. Passes the authentication status (1=authenticated or 0=not authenticated)
 * @param {boolean} isAuthenticated - Provides authentication status: 1 (authenticated) or 0 (not authenticated).
 * @param {string} errorCode - Any error that occurred when determining authentication status. An empty string if none.
 */
function setAuthenticationStatus(isAuthenticated, errorCode) {
    log("setAuthenticationStatus::isAuthenticated:" + JSON.stringify(isAuthenticated));
    log("setAuthenticationStatus::errorCode:" + JSON.stringify(errorCode));
    updateAuthForm((isAuthenticated) ? authParams.AUTHENTICATED : authParams.NOT_AUTHENTICATED);
    if (isAuthenticated) {
        var mrss = "<rss version=\"2.0\" xmlns:media=\"http://search.yahoo.com/mrss/\"><channel><title>" + authRequestorId + "</title><item><title><![CDATA[<?php echo $TITLE ?>]]></title><guid><?php echo $GUID; ?></guid><media:rating scheme=\"urn:v-chip\"><?php echo $RATING; ?></media:rating></item></channel></rss>";
        accessEnabler.getSelectedProvider();
        accessEnabler.getAuthorization(mrss, null);
    } else {
        log("User is not authenticated");
    }
}

/* *
 * Callback triggered by the Access Enabler that delivers the authorized
 * resources list returned after a call to checkPreauthorizedResources().
 * @param {array} authorizedResources: The list of authorized resources.
 */
function preauthorizedResources(authorizedResources) {
    log("preauthorizedResources::authorizedResources:" + JSON.stringify(authorizedResources));
}

/* *
 * Callback triggered by setRequestor().  Delivers configuration information and MVPD list.
 * @param {string} configXML: xml object holding the configuration for the
 * current REQUESTOR including the MVPD list.
 */
function setConfig(configXML) {
    $('#mvpd-select').find('option').remove().end().append('<option value="nothing">Select your provider</option>');
    mvpdList = [];
    $.each($($.parseXML(configXML)).find('mvpd'), function (idx, item) {
        var mvpdId = $(item).find('id').text();
        mvpdList[mvpdId] = {
            displayName: $(item).find('displayName').text(),
            logo: $(item).find('logoUrl').text(),
            popup: $(item).find('iFrameRequired').text() == "true",
            width: $(item).find('iFrameWidth').text(),
            height: $(item).find('iFrameHeight').text()
        };
        $('#mvpd-select').append($('<option value="' + mvpdId + '" title="' + mvpdId + '">' + mvpdList[mvpdId].displayName + '</option>'));
    });
    accessEnabler.getAuthentication();
}

/* *
 * Callback triggered by setRequestor() if handleRedirect parameter=true.
 * @param {string} data - JSON object containing a property (redirectURL)
 * with the MVPD login URL.
 */
function setMvpdRedirectURL(data) {
    log("setMvpdRedirectURL::key:" + JSON.stringify(data));
}

/*
 * Trigger: getMetadata().
 * @param {string} key - The key of the metadata for which the request was made.
 * @param {boolean} encrypted - A flag signifying whether the "value" is
 * encrypted or not. If this is "true" then "value" will actually be a JSON
 * Web Encrypted  representation of the actual value.
 * @param {string} data - A JSON Object with the representation of the
 * metadata.
 */
function setMetadataStatus(key, encrypted, data) {
    log("setMetadataStatus::key:" + JSON.stringify(key));
    log("setMetadataStatus::encrypted:" + JSON.stringify(encrypted));
    log("setMetadataStatus::data:" + JSON.stringify(data));
}

function appendDivMaybe() {
    log("appendDivMaybe");
    var div, iframe, body;

    body = document.body || document.getElementsByTagName("body")[0];

    div = document.getElementById(MVPD_IFRAME_CONTAINER_ID) || document.createElement("div");
    div.id = MVPD_IFRAME_CONTAINER_ID;
    div.name = MVPD_IFRAME_CONTAINER_ID;
    div.style = "display: none;";

    iframe = document.getElementById(MVPD_IFRAME_ID) || document.createElement("iframe");
    iframe.id = MVPD_IFRAME_ID;
    iframe.name = MVPD_IFRAME_ID;
    iframe.src = "#";

    body.appendChild(div);
    div.appendChild(iframe);
}

/* *
 * This function is called if the selected provider is configured to display in an IFrame.
 * A provider is configured to render its authentication screen as either a redirect or in an iFrame, and the Programmer needs to account for both.
 * Trigger: setSelectedProvider(providerID)
 *
 * @param {number} width - the pixel width of the iframe
 * @param {number} height - the pixel height of the iframe
 *
 * @see http://tve.helpdocsonline.com/javascript-api-reference-v2$$getAuthZ
 */
function createIFrame(width, height) {
    log("createIFrame::width:" + JSON.stringify(width));
    log("createIFrame::height:" + JSON.stringify(height));
    appendDivMaybe();

    // Move the div to be centered on the page relative to the size of the iframe.
    var mvpddiv = document.getElementById(MVPD_IFRAME_CONTAINER_ID);
    mvpddiv.style.position = "absolute";
    mvpddiv.style.display = "block";
    mvpddiv.style.top = "50px";
    mvpddiv.style.left = "50%";
    mvpddiv.style.zIndex = "100";
    mvpddiv.style.background = "white";
    mvpddiv.style.marginLeft = "-" + width / 2 + "px";

    // Create the iframe to the specified width and height for the MVPD login page.
    var iframe = document.getElementById(MVPD_IFRAME_ID);
    iframe.style.width = width + "px";
    iframe.style.height = height + "px";

    // Force the name into the DOM since it is still not refreshed, for IE.
    window.frames[MVPD_IFRAME_ID].name = MVPD_IFRAME_ID;
}

function destroyIFrame() {
    log("destroyIFrame::result:" + JSON.stringify(result));
    var el = document.getElementById(MVPD_IFRAME_CONTAINER_ID);
    el.parentNode.removeChild(el);
}

/* *
 * Trigger: getSelectedProvider().
 * @param {object} result - provides information about the provider selected by the user.
 * The result parameter is an Object with these properties:
 * - MVPD The currently selected MVPD, or null if no MVPD was selected.
 * - AE_State The result of authentication for the current customer, one of "New User", "User Not Authenticated", or "User Authenticated
 */
function selectedProvider(result) {
    log("selectedProvider::result:" + JSON.stringify(result));
    selectedMvpdId = result.MVPD;
    $('#mvpd-select').val(selectedMvpdId);
    $('#mvpd-select').attr('disabled', true);
    $('#toggle-auth-btn').html('Logout');
    $('#toggle-auth-btn').toggleClass('btn-outline-warning', false);
    $('#toggle-auth-btn').toggleClass('btn-danger', true);
}

/* *
 * Triggered by: checkAuthentication(), getAuthentication(), checkAuthorization(), getAuthorization()
 * Called to provide tracking data when specific events occur. You can use
 * this, for example, to keep track of how many users have logged in with the
 * same credentials. Tracking is not currently configurable.
 *
 * @param {string} trackingEventType
 * @param {array} data
 * @see http://tve.helpdocsonline.com/javascript-api-reference-v2$sendTracking
 */
function sendTrackingData(trackingEventType, data) {
    log("sendTrackingData::trackingEventType:" + JSON.stringify(trackingEventType));
    log("sendTrackingData::data:" + JSON.stringify(data));
}
// END ADOBE PASS INTEGRATION EXAMPLE

// handles iframe login windows
// https://stackoverflow.com/a/3028037
function hideOnClickOutside(selector) {
    const outsideClickListener = (event) => {
        if (!$(event.target).closest(selector).length) {
            $(selector).remove();
            removeClickListener()
        }
    }

    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
    }

    document.addEventListener('click', outsideClickListener)
}


// https://stackoverflow.com/a/10415599
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            // element added to DOM
            var ismvpddiv = [].some.call(mutation.addedNodes, function (el) {
                return (el.id === MVPD_IFRAME_CONTAINER_ID);
            });
            if (ismvpddiv) {
                // element has id `mvpddiv`
                hideOnClickOutside("#" + MVPD_IFRAME_CONTAINER_ID);
            }
        }
    });
});

var config = {
    attributes: true,
    childList: true,
    characterData: true
};

observer.observe(document.body, config);