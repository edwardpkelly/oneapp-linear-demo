import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state/store/store';

import '../css/app.css';
import '../css/bootstrap.scss';

import findBrandData from './utils/findBrandData';
import { 
    AuthControlComponent,
    VideoPlayerComponent,
    FooterComponent
    } from './app';

const storeInstance = store;

(() => {
    window.DEFAULT_BRAND = findBrandData('nbc');
    let params = new URLSearchParams(window.location.search);
    if (params.get('brand') && findBrandData(params.get('brand'))) {
        DEFAULT_BRAND = findBrandData(params.get('brand'));
    }
})();

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