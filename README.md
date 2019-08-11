# One App Linear (Live TV) Demo App

**Live demo** is available for viewing here: https://edwardpkelly.github.io/oneapp-linear-demo/
_**Note:**_ Due to security and the desire to protect the content streams, domain restriction prevents playback of all content on the link above. For a full, un-restricted live demo, follow this link: http://tve-dev.nbcuni.com/epkelly/9932/react/

A single page application built with Bootstrap and React to test/demo the streaming of multi-channel (multi-brand) content all from one page (a.k.a OneApp Linear Experience).

# Features:

  - Integrated Adobe Pass (Adobe Primetime) authN and authZ (authentication/authorization) 
  - Ability to change content streaming location: select from the East Coast stream or the West Coast stream for brands that offer both
  - Mobile first design 

### Tech

* [React v16.8] - HTML enhanced for web apps!
* [Bootstrap 4] - a free and open-source CSS framework
* [react-redux] - the official Redux UI binding library for React
* [Babel]
* [Webpack 4]
* Adobe Primetime (formerly Adobe Pass) 

### Authentication (authN) / Authorization (authZ)

You must have a valid and current subscription from a TV provider in order to be able to view this content. When you first view this page you will be instructed to login using the credentials provided by your cable television provider. 
1. Select your television provider from the dropdown menu in the header bar
2. Click 'Login'
3. Enter your credentials and follow the prompts from your cable provider
4. If your account is authorized you will now be able to view the live streams


### Installation

Clone the repo locally, then run:

```sh
$ cd oneapp-linear-demo
$ npm install
$ npm run dev
```
The app will open a browser window when the development server starts or you may open your own browser and point to `localhost:8080`.