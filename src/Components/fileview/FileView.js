import React ,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase'
import Fileitem from './Fileitem';
import FileCard from '../fileCard/FileCard';
import Msg from '../Msg';
import './fileview.css';
const FileView = (props) =>{
  
  return (
    <>
    <div className="MainArea">
        <h3>My Drive</h3>
        <div className="files-card">
            {/* files cards */}
            <p>Quick Access</p>
            <div className="fileCardArea">
            {props.files?.slice(0,5).map((doc)=>{
               return ( <FileCard key={doc.id} name={doc.caption} fileUrl={doc.fileUrl}/>)
            })}
            </div>
           
        </div>
        { props.files?.length>0?(
        <div className="fileItem">
         {
           props.files?.map((doc)=>{
             return( <Fileitem key={doc.id} id={doc.id} caption={doc.caption} 
              timestamp={doc.timestamp} fileUrl={doc.fileUrl} size={doc.size} userId={props.auth.uid}/>);
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
    <Msg/>
    </>
)

}

const mapStateToProps=(state)=>{
 return{
   auth:state.firebase.auth,
   files:state.firestore.ordered.myFiles
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props)=>[
    {
      collection: 'myFiles',
      where: [['userId', '==',props.auth.uid]],
    }
])
  )(FileView)
