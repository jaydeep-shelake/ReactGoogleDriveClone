import {ADD_TO_STAR, DELETE_STARED_FILES,DELETE_FILE, ADD_FILE} from '../actions/types'

const handleFiles=(state=[],action)=>{
    switch(action.type){
        case ADD_FILE:
            return[...state,action.payload]
        case ADD_TO_STAR:
            return state;
        case DELETE_FILE:
            return [...state,action.payload]    
        case DELETE_STARED_FILES:
            return state;
         default:
             return state;
    }
}

export default handleFiles;