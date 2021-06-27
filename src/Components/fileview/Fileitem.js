import React from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import DownModal from '../downModal/DownModal';
import {connect} from 'react-redux'
import {handleModal} from '../../actions'
import './fileitem.css';
const Fileitem = ({id,caption,timestamp,fileUrl,size,userId,handleModal,isModalOpen}) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

     const fileDate = `${timestamp?.toDate().getDate()} ${months[timestamp?.toDate().getMonth()+ 1]} ${timestamp?.toDate().getFullYear()}`

     const getFileSize=(fileSizeInBytes)=>{
          let i=-1;
          const byetUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
          do{
              fileSizeInBytes=fileSizeInBytes/1024;
              i++;
          }
          while(fileSizeInBytes>1024);
          return Math.max(fileSizeInBytes,0.1).toFixed(1)+byetUnits[i];
     }
    
     const handleDetails=()=>{
         handleModal(!isModalOpen)
     }
     document.body.addEventListener('click',(e)=>{
        if(e.target.classList.contains('downModal')){
           handleModal(!isModalOpen)
        }
     });

    const setFileImage=()=>{
         if(caption.includes('.png') ||caption.includes('.jpg') ||caption.includes('.jpeg') ){
             return <img src={fileUrl} />
         }
         else if(caption.includes('.pdf')){
             return <div className="img-area"><PictureAsPdfIcon className="icon" style={{fontSize:'55px',color:'#ff4f4f'}}/></div>
         }
         else if(caption.includes('.xsl')||caption.includes('.xlsx') || caption.includes('.xlsm') ){
             return <div className="img-area"><img src="https://cdn.iconscout.com/icon/free/png-512/google-sheets-4-569453.png" alt="sheet" style={{width:'50'}}/></div>
         }
         else if(caption.includes('.docx')){
               return <div className="img-area"><img src="https://cdn.iconscout.com/icon/free/png-256/google-docs-3-569455.png" alt="docs" style={{width:'50%'}}/></div>
         }
         else{
             return <div className="img-area"><img src="https://findicons.com/files/icons/1579/devine/256/file.png" alt="file" style={{width:'50%'}} /></div>
         }
    }
    return (
        <>
            <div className="fileItem-left">
            
                <div className="filePreview">
            <a href={fileUrl} target="_blank" download>
                  {setFileImage()}
                <p>{caption}</p>
            </a>  
                 <small className="des"><p>{fileDate}</p><p>{getFileSize(size)}</p> <MoreVertIcon  className="dots" onClick={handleDetails}/> </small>
                </div>
            </div>

             {isModalOpen&&<DownModal fileUrl={fileUrl} caption={caption} id={id} userId={userId}/>}
        </>
            
    )
}

const mapStateToProps=(state)=>{
   return{isModalOpen:state.Modal.isModalOpen}
}
export default connect(mapStateToProps,{handleModal})(Fileitem)
