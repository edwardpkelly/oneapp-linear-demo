import AuthConstants from '../constants/auth-constants';
import UserConstants from '../constants/user-constants';
import log from '../utils/log';

const authHelper = (windowObj) => {
    const MVPD_IFRAME_CONTAINER_ID = "mvpddiv";
    const MVPD_IFRAME_ID = "mvpdframe";
    windowObj.authRequestorId = windowObj.DEFAULT_BRAND.requestor;
    let authStatus = AuthConstants.NOT_AUTHENTICATED;

    windowObj.entitlementLoaded = () => {
        // kicks off entitlement flow
        accessEnabler.setRequestor(window.DEFAULT_BRAND.requestor, null);
        $(document).trigger(AuthConstants.ENTITLEMENT_LOADED);
    };

    $(document).on(UserConstants.AUTH_BTN_SELECTED, (data) => {
        if (authStatus === AuthConstants.AUTHENTICATED) {
            logoutAdobePass();
        } else {
            const { mvpd } = data;
            accessEnabler.setSelectedProvider(mvpd);
        }
    });


    /* *
     * Triggered by: setProviderDialogURL(), getAuthentication(), getAuthorization()
     * @param {array} providers - An array of Objects representing the requested
     * MVPDs: ` var mvpd = {ID: "someprov",displayName: "Some Provider",logoURL: "http://www.someprov.com/images/logo.jpg"} `
     */
    windowObj.displayProviderDialog = (providers) => {
        log("displayProviderDialog::providers:" + JSON.stringify(providers));

        $(document).trigger({ type: AuthConstants.ON_AUTHENTICATION_STATUS, auth: AuthConstants.NOT_AUTHENTICATED });
    };

    /* *
     * ​Trigger:  checkAuthorization() and getAuthorization() after a successful
     * authorization to view a resource.
     *
     * @param {type} resource - the content that the user is authorized to view.
     * @param {type} token - the short-lived media token
     */
    windowObj.setToken = (resource, token) => {
        log("setToken::resource:" + JSON.stringify(resource));
        log("setToken::token:" + JSON.stringify(token));
        windowObj.encodedAuthorizationToken = encodeURIComponent(token);

        $(document).trigger(AuthConstants.ON_SET_TOKEN);
    };

    /* *
     * ​Trigger: checkAuthorization() and getAuthorization() after an unsuccessful authorization.
     * @param {type} resource - the content that the user was attempting to view
     * @param {type} code - the error code indicating what type of failure
     * occurred
     * @param {type} description - describes the error associated with the error
     * code
     */
    windowObj.tokenRequestFailed = (resource, code, description) => {
        log("tokenRequestFailed::resource:" + JSON.stringify(resource));
        log("tokenRequestFailed::code:" + JSON.stringify(code));
        log("tokenRequestFailed::description:" + JSON.stringify(description));
    };

    /* *
     * Trigger: checkAuthentication(), getAuthentication(), checkAuthorization()
     *
     * Called upon completion of a checkAuthentication() request. Passes the authentication status (1=authenticated or 0=not authenticated)
     * @param {boolean} isAuthenticated - Provides authentication status: 1 (authenticated) or 0 (not authenticated).
     * @param {string} errorCode - Any error that occurred when determining authentication status. An empty string if none.
     */
    windowObj.setAuthenticationStatus = (isAuthenticated, errorCode) => {
        log("setAuthenticationStatus::isAuthenticated:" + JSON.stringify(isAuthenticated));
        log("setAuthenticationStatus::errorCode:" + JSON.stringify(errorCode));

        let status = AuthConstants.AUTHENTICATED;
        if (!isAuthenticated) {
            status = AuthConstants.NOT_AUTHENTICATED;
        }
        $(document).trigger({ type: AuthConstants.ON_AUTHENTICATION_STATUS, auth: status });

        if (isAuthenticated) {
            authStatus = AuthConstants.AUTHENTICATED;
            const mrss = "<rss version=\"2.0\" xmlns:media=\"http://search.yahoo.com/mrss/\"><channel><title>" + windowObj.authRequestorId + "</title><item><title><![CDATA[<?php echo $TITLE ?>]]></title><guid><?php echo $GUID; ?></guid><media:rating scheme=\"urn:v-chip\"><?php echo $RATING; ?></media:rating></item></channel></rss>";
            accessEnabler.getSelectedProvider();
            accessEnabler.getAuthorization(mrss, null);
        } else {
            log("User is not authenticated");
            authStatus = AuthConstants.NOT_AUTHENTICATED;
        }
    };

    /* *
     * Callback triggered by the Access Enabler that delivers the authorized
     * resources list returned after a call to checkPreauthorizedResources().
     * @param {array} authorizedResources: The list of authorized resources.
     */
    windowObj.preauthorizedResources = (authorizedResources) => {
        log("preauthorizedResources::authorizedResources:" + JSON.stringify(authorizedResources));
    }

    /* *
     * Callback triggered by setRequestor().  Delivers configuration information and MVPD list.
     * @param {string} configXML: xml object holding the configuration for the
     * current REQUESTOR including the MVPD list.
     */
    windowObj.setConfig = (configXML) => {
        let mvpdList = [];
        $.each($($.parseXML(configXML)).find('mvpd'), (idx, item) => {
            let mvpdItem = {
                mvpdId: $(item).find('id').text(),
                displayName: $(item).find('displayName').text(),
                logo: $(item).find('logoUrl').text(),
                popup: $(item).find('iFrameRequired').text() == "true",
                width: $(item).find('iFrameWidth').text(),
                height: $(item).find('iFrameHeight').text()
            };
            mvpdList.push(mvpdItem);
        });
        // for dev only. Comment line below for Production
        mvpdList = mvpdList.slice(375, 380);

        $(document).trigger({ type: AuthConstants.ON_SET_CONFIG, mvpdList });

        accessEnabler.getAuthentication();
    };

    /* *
     * Callback triggered by setRequestor() if handleRedirect parameter=true.
     * @param {string} data - JSON object containing a property (redirectURL)
     * with the MVPD login URL.
     */
    windowObj.setMvpdRedirectURL = data => {
        log("setMvpdRedirectURL::key:" + JSON.stringify(data));
    };

    /*
     * Trigger: getMetadata().
     * @param {string} key - The key of the metadata for which the request was made.
     * @param {boolean} encrypted - A flag signifying whether the "value" is
     * encrypted or not. If this is "true" then "value" will actually be a JSON
     * Web Encrypted  representation of the actual value.
     * @param {string} data - A JSON Object with the representation of the
     * metadata.
     */
    windowObj.setMetadataStatus = (key, encrypted, data) => {
        log("setMetadataStatus::key:" + JSON.stringify(key));
        log("setMetadataStatus::encrypted:" + JSON.stringify(encrypted));
        log("setMetadataStatus::data:" + JSON.stringify(data));
    };

    const appendDivMaybe = () => {
        log("appendDivMaybe");
        let div, iframe, body;

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
    windowObj.createIFrame = (width, height) => {
        log("createIFrame::width:" + JSON.stringify(width));
        log("createIFrame::height:" + JSON.stringify(height));
        appendDivMaybe();

        // Move the div to be centered on the page relative to the size of the iframe.
        const mvpddiv = document.getElementById(MVPD_IFRAME_CONTAINER_ID);
        mvpddiv.style.position = "absolute";
        mvpddiv.style.display = "block";
        mvpddiv.style.top = "50px";
        mvpddiv.style.left = "50%";
        mvpddiv.style.zIndex = "100";
        mvpddiv.style.background = "white";
        mvpddiv.style.marginLeft = "-" + width / 2 + "px";

        // Create the iframe to the specified width and height for the MVPD login page.
        const iframe = document.getElementById(MVPD_IFRAME_ID);
        iframe.style.width = width + "px";
        iframe.style.height = height + "px";

        // Force the name into the DOM since it is still not refreshed, for IE.
        window.frames[MVPD_IFRAME_ID].name = MVPD_IFRAME_ID;
    };

    windowObj.destroyIFrame = () => {
        log("destroyIFrame::result:" + JSON.stringify(result));
        const el = document.getElementById(MVPD_IFRAME_CONTAINER_ID);
        el.parentNode.removeChild(el);
    };

    /* *
     * Trigger: getSelectedProvider().
     * @param {object} result - provides information about the provider selected by the user.
     * The result parameter is an Object with these properties:
     * - MVPD The currently selected MVPD, or null if no MVPD was selected.
     * - AE_State The result of authentication for the current customer, one of "New User", "User Not Authenticated", or "User Authenticated
     */
    windowObj.selectedProvider = result => {
        windowObj.selectedMvpdId = result.MVPD;

        $(document).trigger({ type: AuthConstants.ON_SET_SELECTED_PROVIDER, mvpd: selectedMvpdId });

        log("selectedProvider::result:" + JSON.stringify(result));
        //$('#mvpd-select').val(selectedMvpdId);
        //$('#mvpd-select').attr('disabled', true);
        //$('#toggle-auth-btn').html('Logout');
        //$('#toggle-auth-btn').toggleClass('btn-outline-warning', false);
        //$('#toggle-auth-btn').toggleClass('btn-danger', true);
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
    windowObj.sendTrackingData = (trackingEventType, data) => {
        log("sendTrackingData::trackingEventType:" + JSON.stringify(trackingEventType));
        log("sendTrackingData::data:" + JSON.stringify(data));
    };
    // END ADOBE PASS INTEGRATION EXAMPLE

    // handles iframe login windows
    // https://stackoverflow.com/a/3028037
    const hideOnClickOutside = selector => {
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

    function logoutAdobePass() {
        accessEnabler.logout();
        if (windowObj.location) windowObj.location.reload();
    };


    // https://stackoverflow.com/a/10415599
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                // element added to DOM
                const ismvpddiv = [].some.call(mutation.addedNodes, el => {
                    return (el.id === MVPD_IFRAME_CONTAINER_ID);
                });
                if (ismvpddiv) {
                    // element has id `mvpddiv`
                    hideOnClickOutside("#" + MVPD_IFRAME_CONTAINER_ID);
                }
            }
        });
    });

    const config = {
        attributes: true,
        childList: true,
        characterData: true
    };

    observer.observe(document.body, config);
};

export const configureAuthHelper = () => {
    authHelper(window || {});
};