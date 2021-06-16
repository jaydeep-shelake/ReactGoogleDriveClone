import React ,{useState}from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DownModal from '../downModal/DownModal';

import './fileitem.css';
const Fileitem = ({id,caption,timestamp,fileUrl,size,userId}) => {
    const [isOpen,setIsOpen]=useState(false)
    const [msg,setMsg]=useState(null);
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
         setIsOpen(true);
     }
     document.body.addEventListener('click',(e)=>{
        if(e.target.classList.contains('downModal')){
           setIsOpen(false);
        }
     });
  if(msg){
     setTimeout(()=>{
        setMsg(null)
     },1700)
    }
    return (
        <>
            <div className="fileItem-left">
            
                <div className="filePreview">
            <a href={fileUrl} target="_blank" download>
                <img src={fileUrl}/>
                <p>{caption}</p>
            </a>  
                 <small className="des"><p>{fileDate}</p><p>{getFileSize(size)}</p> <MoreVertIcon  className="dots" onClick={handleDetails}/> </small>
                </div>
            </div>

             {isOpen&&<DownModal fileUrl={fileUrl} caption={caption} id={id} userId={userId} setOpen={setIsOpen} setMsg={setMsg} />}
             <div className={`msg ${msg&& 'showmsg'}`}>{msg}</div>
        </>
            
    )
}


export default Fileitem
