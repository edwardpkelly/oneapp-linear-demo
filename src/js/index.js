import React from 'react';
import { render } from 'react-dom';

import '../css/app.css';
import '../css/bootstrap.scss';
import AuthConstants from './constants/auth-constants';
import { loadPlayer } from './player/player';
import { configureAuthHelper } from './auth/authHelper';

import findBrandData from './utils/findBrandData';
import { 
    AuthControlComponent,
    InfoHeadlineComponent,
    VideoPlayerComponent,
    MediaItemsComponent,
    FooterComponent
} from './app';

const setDefaultBrandData = (windowObj = {}) => {
    windowObj.DEFAULT_BRAND = findBrandData('nbc');
    let params = new URLSearchParams(windowObj.location.search);
    if (params.get('brand') && findBrandData(params.get('brand'))) {
        DEFAULT_BRAND = findBrandData(params.get('brand'));
        debugger;
        if (DEFAULT_BRAND.callsigns.length) {
            if (params.get('callsign')) {
                DEFAULT_BRAND.callsign = params.get('callsign');
            } else {
                DEFAULT_BRAND.callsign = DEFAULT_BRAND.callsigns[0].data;
            }
        }
    }
};

(() => {
    const windowObj = window || {};
    setDefaultBrandData(windowObj);
    configureAuthHelper();
})();

$(document).on(AuthConstants.ON_SET_TOKEN, (event) => {
    loadPlayer();
});

const renderApp = () => {
    render(
        <AuthControlComponent />,
        document.getElementById('auth-control')
    );

    render(
        <InfoHeadlineComponent />,
        document.getElementById('watching-header')
    );

    render(
        <VideoPlayerComponent />,
        document.getElementById('playerContainer')
    );

    render(
        <MediaItemsComponent />,
        document.getElementById('mediaItems')
    );

    render(
        <FooterComponent />,
        document.getElementById('footer')
    );
};

try {
    renderApp();
} catch (e) {
    throw new Error(e);
}