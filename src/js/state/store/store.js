import mediaItems from '../../model/media';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import auth from '../reducers/auth';
import media from '../reducers/media';
import user from '../reducers/user';
import UserMiddleware from '../store/middleware/user-middleware';
import { adobePassActionCreator } from '../actions/adobepass-action-creator';

const configureStore = () => {
    const store = createStore(
        combineReducers({
            auth,
            media,
            user
        }),
        initialState(mediaItems),
        composeWithDevTools(
            applyMiddleware(
                UserMiddleware
            )
        )
    );
    adobePassActionCreator(store);

    return store;
};

export const store = configureStore();