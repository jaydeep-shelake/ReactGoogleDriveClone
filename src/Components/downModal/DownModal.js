import React from 'react'
import {connect} from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {addToStar,handleModal,handleMsg,deleteFile} from '../../actions'
import './downModal.css';
const DownModal = ({fileUrl,caption,id,userId,handleModal,addToStar,handleMsg,deleteFile}) => {
        
    const handleAddToStarred=()=>{
      addToStar(fileUrl,caption,userId)   
    }

    const handleDeleteFile=()=>{
      deleteFile(id,caption)
    }

    const copyToClipboard=()=>{
      navigator.clipboard.writeText(fileUrl).then(()=>{
           console.log('text copied sucessfully')
           handleModal(false)
           handleMsg({msg:'Copied to clipboard',err:false})
           setTimeout(()=>{
            handleMsg({msg:'',err:false})
           },1400)
      })
      .catch((e)=>{
         console.log(e)
      })
    }

    return (
      <>
        <div className="downModal">
            <div className="box">
             <div onClick={copyToClipboard}>
               <FileCopyIcon/> Copy link 
             </div>
             <div onClick={handleAddToStarred}>
               <StarBorderIcon/> Add to Starred
             </div>
             <div onClick={handleDeleteFile}>
                <DeleteIcon/> Remove
             </div>
            </div>
        </div>
        </>
    )
}

const mapStateToProps=(state)=>{
 return {myFiles:state.firestore.ordered.myFiles}
}
export default connect(mapStateToProps,{addToStar,handleModal,handleMsg,deleteFile})(DownModal)
