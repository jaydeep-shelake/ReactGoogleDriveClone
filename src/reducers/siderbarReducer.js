import {HANDLE_SIDEBAR} from '../actions/types'

const handleSidebar=(state={sidebarOpen:false},action)=>{
      switch(action.type){
          case HANDLE_SIDEBAR:
              return {...state,sidebarOpen:action.payload}
          default:
             return state
      }
}
export default handleSidebar;
