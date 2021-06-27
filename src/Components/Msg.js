import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
const Msg = ({msg,err}) => {
   return ReactDOM.createPortal(
        <div className={`msg ${msg&& 'showmsg'} ${err&& 'err'}`}>{msg}</div>,
        document.getElementById('message')
    )
}

const mapStateToProps=(state)=>{
  return{msg:state.msg.msg,err:state.msg.err}
}

export default connect(mapStateToProps)(Msg)
