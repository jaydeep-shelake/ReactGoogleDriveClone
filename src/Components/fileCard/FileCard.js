import React from 'react';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import './fileCard.css';
import {db} from '../../firebase'
const FileCard = ({id,name,fileUrl,del}) => {
    const delteStaredFile=async()=>{
        await db.collection("myStarredFiles").doc(id).delete().then(()=>{
            console.log("Document successfully deleted!");
          }).catch((e)=>{
            console.log(e)
          })
    }
    return (
        <div className='fileCard'>
            <div className="fileArea">
            <a href={fileUrl} className="fileCrad-top">
                <img src={fileUrl} style={{height:'auto'}}/>
                <p>{name}</p>
            </a>
            <div className="deletbtn" onClick={delteStaredFile}>
              {del&&<DeleteOutlineIcon style={{cursor:'pointer'}}/>}
              </div>
            </div>
        </div>
    )
}

export default FileCard
