import React from 'react';
import { render } from 'react-dom';

import '../css/app.css';
import '../css/bootstrap.scss';
import { loadPlayer } from './player/player';
import AuthConstants from './constants/auth-constants';
import { configureAuthHelper } from './auth/authHelper';

import findBrandData from './utils/findBrandData';
import { 
    AuthControlComponent,
    VideoPlayerComponent,
    MediaGridComponent,
    FooterComponent
} from './app';

(() => {
    const windowObj = window || {};
    windowObj.DEFAULT_BRAND = findBrandData('nbc');
    let params = new URLSearchParams(windowObj.location.search);
    if (params.get('brand') && findBrandData(params.get('brand'))) {
        DEFAULT_BRAND = findBrandData(params.get('brand'));
    }
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
        <VideoPlayerComponent />,
        document.getElementById('playerContainer')
    );

    render(
        <MediaGridComponent />,
        document.getElementById('channels')
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