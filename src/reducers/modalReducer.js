import {HANDLE_MODAL} from '../actions/types';

const handleModal=(state={isModalOpen:false},action)=>{
             switch(action.type){
                 case HANDLE_MODAL:
                     return {...state,isModalOpen:action.payload}
                 default:
                     return state;
             }
}

export default handleModal;