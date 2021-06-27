import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import {connect} from 'react-redux'
import './fileCard.css';
import {deleteStaredFiles} from '../../actions'
const FileCard = ({id,name,fileUrl,del,deleteStaredFiles}) => {
    const setFileImage=()=>{
        if(name.includes('.png') ||name.includes('.jpg') ||name.includes('.jpeg') ){
            return <img src={fileUrl} />
        }
        else if(name.includes('.pdf')){
            return <div className="img-area"><PictureAsPdfIcon className="icon" style={{fontSize:'35px',color:'#ff4f4f'}}/></div>
        }
        else if(name.includes('.xsl')||name.includes('.xlsx') || name.includes('.xlsm') ){
            return <img src="https://cdn.iconscout.com/icon/free/png-512/google-sheets-4-569453.png" alt="sheet" style={{width:'50%'}}/>
        }
        else if(name.includes('.docx')){
              return <img src="https://cdn.iconscout.com/icon/free/png-256/google-docs-3-569455.png" alt="docs" style={{width:'50%'}}/>
        }
        else{
            return <img src="https://findicons.com/files/icons/1579/devine/256/file.png" alt="file" style={{width:'50%',background:'rgba(0,0,0.345)'}} />
        }
   }
    const delteStared=()=>{
       deleteStaredFiles(id);
    }
    return (
        <div className='fileCard'>
            <div className="fileArea">
            <a href={fileUrl} className="fileCrad-top">
                 {setFileImage()}
                <p>{name}</p>
            </a>
            <div className="deletbtn" onClick={delteStared}>
              {del&&<DeleteOutlineIcon style={{cursor:'pointer'}}/>}
              </div>
            </div>
        </div>
    )
}

export default connect(null,{deleteStaredFiles})(FileCard)
