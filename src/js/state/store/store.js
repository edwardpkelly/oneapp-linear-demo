import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import auth from '../reducers/auth';
import user from '../reducers/user';
import UserMiddleware from '../store/middleware/user-middleware';
import { adobePassActionCreator } from '../actions/adobepass-action-creator';

const configureStore = () => {
    const store = createStore(
        combineReducers({
            auth,
            user
        }),
        initialState(),
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