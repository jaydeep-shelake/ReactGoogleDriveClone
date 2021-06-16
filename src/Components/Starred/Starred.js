import React,{useState,useEffect}from 'react';
import {db} from '../../firebase';
import FileCard from '../fileCard/FileCard';
import '../fileCard/fileCard.css'
const Starred = ({currentUser}) => {
    console.log(currentUser.uid)
    const [starredFiles,setStarredFiles]=useState([]);
    useEffect(()=>{
         db.collection('myStarredFiles').where("userId","==",currentUser.uid).onSnapshot(snapshot=>{
             setStarredFiles(snapshot.docs.map(doc=>({
               id:doc.id,
               item:doc.data(),
             })));
         })
    },[]);
    return (
        <div className="starred">
            <div className="files-card">
                <p>Starred</p>
                <div className="fileCardArea">
                {starredFiles?.map(({id,item})=>{
                   return ( <FileCard key={id} id={id} name={item.caption} fileUrl={item.fileUrl} del/>)
                })}
                </div>
               
            </div>
        </div>
    )
}

export default Starred
