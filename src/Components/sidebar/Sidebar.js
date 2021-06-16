

import React ,{useState}from 'react';
import {Link} from 'react-router-dom';
import './sidebar.css';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import SidebarIcons from './SidebarIcons';
import firebase from 'firebase';
import {storage,db} from '../../firebase';

const getModalStyle=()=>{
    return{
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        position:'fixed',
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Sidebar = ({currentUser,setSidebarOpen,sidebarOpen}) => {
    const classes = useStyles();

    const [modalStyle]=useState(getModalStyle);
    const [open ,setOpen]=useState(false);
    const [file,setFile]=useState(null);
    const [uploading,setUploading]=useState(false);

    const handleOpen =()=>{
        setOpen(true);
    }

    const handleClose = ()=>{
        setOpen(false);
    }

    const handleChange =(e)=>{
      if(e.target.files[0]){
          setFile(e.target.files[0]);
      }
    }
    const handleUpload =()=>{
        setUploading(true);
        storage.ref(`files/${file.name}`).put(file)
        .then(snapshot=>{
            console.log(snapshot);
            
            storage.ref('files').child(file.name).getDownloadURL()
            .then(url=>{
                db.collection('myFiles').add({
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    caption:file.name,
                    fileUrl:url,
                    size:snapshot._delegate.bytesTransferred,
                    userId:currentUser.uid
                });
                setUploading(false);
                setOpen(false);
                setFile(null);
            })
        })
    }
    return (
        <>
        <div className={`sidebar ${sidebarOpen&& 'ativesidebar'}`}>
            <div className="add-button-container">
                <button className="add-button" onClick={handleOpen}>
                <img src="data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2236%22 height=%2236%22 viewBox=%220 0 36 36%22%3E%3Cpath fill=%22%2334A853%22 d=%22M16 16v14h4V20z%22/%3E%3Cpath fill=%22%234285F4%22 d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath fill=%22%23FBBC05%22 d=%22M6 16v4h10l4-4z%22/%3E%3Cpath fill=%22%23EA4335%22 d=%22M20 16V6h-4v14z%22/%3E%3Cpath fill=%22none%22 d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E" alt=""/>
                <span>New</span>
                </button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <p>Select files you want to upload!</p>
                    {
                        uploading ? (
                            <p>Uploading...</p>
                        ) : (
                                <div className="flibtns">
                                   <label htmlFor="file" className="fileLabel">Choose file</label>
                                    <input id="file" className="fileBtn" type="file" onChange={handleChange} />
                                    <button  className="uploadBtn" onClick={handleUpload}><CloudUploadIcon/>Upload</button>
                                </div>
                            )
                    }
                </div>
            </Modal>

            <div className="sidebar-items-container">
               
            <Link to="/"><SidebarIcons arrow icon={(<InsertDriveFileIcon />)} label={'My Drive'} active/></Link>
                <SidebarIcons icon={(<PeopleAltIcon />)} label={'Shared with me'} />
                <SidebarIcons icon={(<QueryBuilderIcon />)} label={'Recent'} />
                
              <Link to="/starred">
                <SidebarIcons icon={(<StarBorderIcon />)} label={'Starred'} />
                </Link> 
            
                <SidebarIcons icon={(<DeleteOutlineIcon />)} label={'Trash'} />
                <hr/>
                 <SidebarIcons icon={(<CloudQueueIcon/>)} label={'Storage'}/>
                
            </div>
        </div>
        <div onClick={()=>setSidebarOpen(false)} className={`cloasesidebar ${!sidebarOpen&& 'displaynone'}`}>
            
        </div>
        </>
    )
}

export default Sidebar
