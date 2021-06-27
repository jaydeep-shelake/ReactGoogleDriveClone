import {provider} from '../fbConfig';
import firebase from 'firebase'
import {SIGN_IN,SIGN_OUT,HANDLE_SIDEBAR, ADD_TO_STAR, HANDLE_MODAL,HANDLE_MSG,DELETE_STARED_FILES, DELETE_FILE, ADD_FILE} from './types'
export const loginWithGoogle=()=>async(dispacth,getState,{getFirebase})=>{
 const firebase = getFirebase();
 const user = await firebase.auth().signInWithPopup(provider);
 dispacth({type:SIGN_IN})
}

export const logout =()=>async(dispacth,getState,{getFirebase})=>{
    const firebase = getFirebase();
    await firebase.auth().signOut();
    dispacth({type:SIGN_OUT})

}

//sidebar actions
export const handleSiderbar=(boolean)=>{
return {type:HANDLE_SIDEBAR,payload:boolean}
}

//files 



export const handleModal=(boolean)=>{
    return{type:HANDLE_MODAL,payload:boolean}
}

export const handleMsg=(msg)=>{
    return{type:HANDLE_MSG,payload:msg}
}

export const addFile=(file,uid,url,snapshot)=>async(dispatch,getState,{getFirebase,getFirestore})=>{
       const firestore=getFirestore();
       await firestore.collection('myFiles').add({
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        caption:file.name,
        fileUrl:url,
        size:snapshot._delegate.bytesTransferred,
        userId:uid
    });
    dispatch({type:ADD_FILE,payload:file.name})
    dispatch(handleMsg({msg:'Added file successfuly',err:false}))
    setTimeout(()=>{
        dispatch(handleMsg({msg:'',err:false}))
    },1400)
}

export const addToStar=(fileURL,caption,userId)=>async(dispatch,getState,{getFirebase,getFirestore})=>{
    const firestore=getFirestore()
    await firestore.collection('myStarredFiles').add({
       caption,
       fileUrl:fileURL,
       userId
   })
    dispatch({type:ADD_TO_STAR,payload:{caption,fileUrl:fileURL,userId}})
    dispatch(handleModal(false))
    dispatch(handleMsg({msg:'Added to stared',err:false}))
    setTimeout(()=>{
        dispatch(handleMsg({msg:'',err:false}))
    },1400)
   }

export const deleteFile=(id,caption)=>async(dispatch,getState,{getFirebase,getFirestore})=>{
     const firestore = getFirestore();
    await firestore.collection('myFiles').doc(id).delete()
    .then(()=>{
        dispatch({type:DELETE_FILE,payload:id})
        dispatch(handleModal(false))
        dispatch(handleMsg({msg:'Deleted file successfuly',err:false}))
       firebase.storage().ref('files').child(caption).delete().then(()=>{
           console.log('deleted file from storage')
       })
       setTimeout(()=>{
        dispatch(handleMsg({msg:'',err:false}))
    },1400)
    })
    .catch(()=>{
        dispatch(handleMsg({msg:'unable to delete',err:true}))
    })
} 

export const deleteStaredFiles=(id)=>async(dispatch,getState,{getFirebase,getFirestore})=>{
    const firestore=getFirestore()
    await firestore.collection('myStarredFiles').doc(id).delete().then(()=>{
        console.log("Document successfully deleted!");
        dispatch(handleMsg({msg:'Deleted file sucessfully',err:false}))
        dispatch({type:DELETE_STARED_FILES})
        setTimeout(()=>{
            dispatch(handleMsg({msg:'',err:false}))
        },1400)
      }).catch((e)=>{
        console.log(e)
        dispatch(handleMsg({msg:'Something went wrong',err:true}))
      })
}