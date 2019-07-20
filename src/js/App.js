import React from 'react';
import { Provider } from 'react-redux';
import AuthControl from './components/AuthControl';
import InfoHeadline from './components/InfoHeadline';
import VideoPlayer from './components/VideoPlayer';
import MediaItemsContainer from './components/MediaItemsContainer';
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

const InfoHeadlineComponent = () => {
    return (
        <Provider store={storeInstance}>
            <InfoHeadline />
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

const MediaItemsComponent = () => {
    return (
        <Provider store={storeInstance}>
            <MediaItemsContainer />
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
    InfoHeadlineComponent,
    VideoPlayerComponent,
    MediaItemsComponent,
    FooterComponent
}