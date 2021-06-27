import { HANDLE_MSG } from "../actions/types";

const handleMsg =(state={msg:'',err:false},action)=>{
          switch(action.type){
             case HANDLE_MSG:
                return {...state,msg:action.payload.msg,err:action.err}
            default:
                return state;
          }
}

export default handleMsg;