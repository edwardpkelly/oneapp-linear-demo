import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './state/store/store';
import findBrandData from './utils/findBrandData';

import '../css/app.css';
import '../css/bootstrap.scss';

const storeInstance = store;


(() => {
    //let DEFAULT_BRAND;
    window.DEFAULT_BRAND = findBrandData('nbc');
    console.log(DEFAULT_BRAND);
    let params = new URLSearchParams(window.location.search);
    if (params.get('brand') && findBrandData(params.get('brand'))) {
        DEFAULT_BRAND = findBrandData(params.get('brand'));
    }
})();

const renderApp = () => {
    render(
        <Provider store={storeInstance}>
            <App />
        </Provider>,
        document.getElementById('app')
    );
};

try {
    renderApp();
} catch (e) {
    throw new Error(e);
}