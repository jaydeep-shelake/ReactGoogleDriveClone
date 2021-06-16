import React ,{useState,useEffect} from 'react';
import {db} from '../../firebase';
import Fileitem from './Fileitem';
import FileCard from '../fileCard/FileCard';
import './fileview.css';
const FileView = ({currentUser}) => {
    const [files,setFiles]=useState([]);
    useEffect(()=>{
        // db.collection('myFiles').doc(user.uid).get().then(doc=>{

        // })
           db.collection('myFiles').where("userId","==",currentUser.uid).onSnapshot(snapshot=>{
               setFiles(snapshot.docs.map(doc=>({
                    id: doc.id,
                    item:doc.data(),
               })))
           })
    },[]);
    return (
        <div className="MainArea">
            <h3>My Drive</h3>
            <div className="files-card">
                {/* files cards */}
                <p>Quick Access</p>
                <div className="fileCardArea">
                {files.slice(0,5).map(({id,item})=>{
                   return ( <FileCard key={id} name={item.caption} fileUrl={item.fileUrl}/>)
                })}
                </div>
               
            </div>
            { files.length>0?(
            <div className="fileItem">
             {
               files.map(({id,item})=>{
                 return( <Fileitem key={id} id={id} caption={item.caption} 
                  timestamp={item.timestamp} fileUrl={item.fileUrl} size={item.size} userId={currentUser.uid}/>);
                })
            }
            </div>
            ):(
                <div className="fileItem">
                   <h2> No files found please add one</h2>
                </div> 
            )
              }
        </div>
    )
}

export default FileView
