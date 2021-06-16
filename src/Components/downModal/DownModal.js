import React,{useState} from 'react'
import {db,storage} from '../../firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './downModal.css';
const DownModal = ({fileUrl,caption,id,userId,setOpen,setMsg}) => {
        
    const addToStarred= async()=>{
    const data = await db.collection('myStarredFiles').doc(id).set({
         fileUrl,
         caption,
         userId
    })
    .then(()=>{
      console.log('sucessfully added start')
      setOpen(false)
    }).catch((e)=>{
      console.log(e)
    })   
    }

    const deleteFile=async()=>{
    await db.collection("myFiles").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        setMsg("File deleted succsessfuly")
        storage.ref(`files`).child(caption).delete().then(()=>{
         console.log("deleted file successfully")
        })
        .catch((error)=>{
          console.error("Error removing document: ", error);
        })

    }).catch((error) => {
        console.error("Error removing document: ", error);
        setMsg("Sorry,File Not deleted try again")
    });

    if(db.collection("myStarredFiles").doc(id)){
    await db.collection("myStarredFiles").doc(id).delete().then(()=>{
      console.log("Document successfully deleted!");
        setMsg(" Stared file deleted succsessfuly")
    }).catch((e)=>{
      console.log(e)
    })
  }
    }

    const copyToClipboard=()=>{
      navigator.clipboard.writeText(fileUrl).then(()=>{
           console.log('text copied sucessfully')
           setOpen(false)
           setMsg("Copied To clipboard")
      })
      .catch((e)=>{
         console.log(e)
         setMsg("faild To clipboard")
      })
    }

    return (
      <>
        <div className="downModal">
            <div className="box">
             <div onClick={copyToClipboard}>
               <FileCopyIcon/> Copy link 
             </div>
             <div onClick={addToStarred}>
               <StarBorderIcon/> Add to Starred
             </div>
             <div onClick={deleteFile}>
                <DeleteIcon/> Remove
             </div>
            </div>
        </div>
        </>
    )
}

export default DownModal
