import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from './initialState';
import auth from '../reducers/auth';
import { adobePassActionCreator } from '../actions/adobepass-action-creator';

const configureStore = () => {
    const store = createStore(
        combineReducers({
            auth
        }),
        initialState(),
        composeWithDevTools()
    );
    adobePassActionCreator(store);

    return store;
};

export const store = configureStore();