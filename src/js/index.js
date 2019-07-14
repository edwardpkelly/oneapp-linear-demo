import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state/store/store';

import '../css/app.css';
import '../css/bootstrap.scss';
import { configureAuthHelper } from './auth/authHelper';

(() => {
    const windowObj = window || {};
    windowObj.DEFAULT_BRAND = findBrandData('nbc');
    let params = new URLSearchParams(windowObj.location.search);
    if (params.get('brand') && findBrandData(params.get('brand'))) {
        DEFAULT_BRAND = findBrandData(params.get('brand'));
    }
    configureAuthHelper();
})();


import findBrandData from './utils/findBrandData';
import { 
    AuthControlComponent,
    VideoPlayerComponent,
    FooterComponent
    } from './app';

const storeInstance = store;

const renderApp = () => {
    render(
        <Provider store={storeInstance}>
            <AuthControlComponent />
        </Provider>,
        document.getElementById('auth-control')
    );

    render(
        <Provider store={storeInstance}>
            <VideoPlayerComponent />
        </Provider>,
        document.getElementById('playerContainer')
    );

    render(
        <Provider store={storeInstance}>
            <FooterComponent />
        </Provider>,
        document.getElementById('footer')
    );
};

try {
    renderApp();
} catch (e) {
    throw new Error(e);
}