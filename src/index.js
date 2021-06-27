import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore,applyMiddleware,compose}from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers/index'
import {createFirestoreInstance,getFirestore} from'redux-firestore'
import {ReactReduxFirebaseProvider,getFirebase} from 'react-redux-firebase'
import firebase from './fbConfig';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore})),
    )
    )
    const rrfProps={
        firebase,
        config:{},
        dispatch:store.dispatch,
        createFirestoreInstance
    }
ReactDOM.render(

        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
               <App/>
          </ReactReduxFirebaseProvider>
        </Provider>,
    document.getElementById('root')
);