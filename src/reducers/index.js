import {combineReducers} from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import authReducer from './authReducers'
import handleSidebar from './siderbarReducer'
import handleFiles from './filesReducer';
import handleModal from './modalReducer';
import handleMsg from './msgReducer'
const rootReducer= combineReducers({
    auth:authReducer,
    firestore:firestoreReducer,
    firebase:firebaseReducer,
    siderbar:handleSidebar,
    staredFiles:handleFiles,
    Modal:handleModal,
    msg:handleMsg
})

export default rootReducer;