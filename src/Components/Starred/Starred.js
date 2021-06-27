import React from 'react';
import FileCard from '../fileCard/FileCard';
import {compose}from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import '../fileCard/fileCard.css'
const Starred = (props) => {
     console.log(props)
    return (
        <div className="starred">
            <div className="files-card">
                <p>Starred</p>
                <div className="fileCardArea">
                {props.starredFiles?.map((doc)=>{
                   return ( <FileCard key={doc.id} id={doc.id} name={doc.caption} fileUrl={doc.fileUrl} del/>)
                })}
                </div>
               
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
      auth:state.firebase.auth,
      starredFiles:state.firestore.ordered.myStarredFiles
     }
   }
   
   export default compose(
     connect(mapStateToProps),
     firestoreConnect((props)=>[
       {
         collection: 'myStarredFiles',
         where: [['userId', '==',props.auth.uid]],
       }
   ])
     )(Starred)
   
