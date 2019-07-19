import mediaItems from '../../model/media';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import auth from '../reducers/auth';
import media from '../reducers/media';
import player from '../reducers/player';
import UserMiddleware from '../store/middleware/user-middleware';
import { adobePassActionCreator } from '../actions/adobepass-action-creator';
import { playerActionCreator } from '../actions/player-action-creator';

const configureStore = () => {
    const store = createStore(
        combineReducers({
            auth,
            media,
            player
        }),
        initialState(mediaItems),
        composeWithDevTools(
            applyMiddleware(
                UserMiddleware
            )
        )
    );
    adobePassActionCreator(store);
    playerActionCreator(store);
    
    return store;
};

export const store = configureStore();