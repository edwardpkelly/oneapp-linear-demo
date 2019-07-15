import React from 'react';
import { Provider } from 'react-redux';
import AuthControl from './components/AuthControl';
import VideoPlayer from './components/VideoPlayer';
import MediaGrid from './components/MediaGrid';
import Footer from './components/Footer';
import { store } from './state/store/store';

const storeInstance = store;

const AuthControlComponent = () => {
    return (
        <Provider store={storeInstance}>
            <AuthControl />
        </Provider>
    );
};

const VideoPlayerComponent = () => {
    return (
        <Provider store={storeInstance}>
            <VideoPlayer />
        </Provider>
    );
};

const MediaGridComponent = () => {
    return (
        <Provider store={storeInstance}>
            <MediaGrid />
        </Provider>
    );
};

const FooterComponent = () => {
    return (
        <Provider store={storeInstance}>
            <Footer />
        </Provider>
    );
};

export {
    AuthControlComponent,
    VideoPlayerComponent,
    MediaGridComponent,
    FooterComponent
}