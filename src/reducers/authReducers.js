import {SIGN_IN,SIGN_OUT} from '../actions/types';

const authReducer=(state={signedIn:null},action)=>{
    switch(action.type){
        case SIGN_IN:
            return {...state,signedIn:true}
        case SIGN_OUT:
            return {...state,signedIn:false}    
        default:
            return state    
    }
}

export default authReducer