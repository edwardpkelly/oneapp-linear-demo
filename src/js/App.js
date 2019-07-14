import React from 'react';
import VideoPlayer from './components/VideoPlayer';
import AuthControl from './components/AuthControl';
import Footer from './components/Footer';

const AuthControlComponent = () => {
    return <AuthControl />;
};

const VideoPlayerComponent = () => {
    return <VideoPlayer />;
};

const FooterComponent = () => {
    return <Footer />;
};

export {
    AuthControlComponent,
    VideoPlayerComponent,
    FooterComponent
}