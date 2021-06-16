import React ,{useState}from 'react'
import './header.css';
import {Link} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import AppsIcon from '@material-ui/icons/Apps';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {auth} from '../../firebase'
const Header = ({userPhoto,name,email}) => {
  
    const [open,setOpen]=useState(false);

    const handleSignout =async()=>{
        console.log('clicked')
      try{
        await auth.signOut();
      }
      catch(e){
         console.log(e);
      }
    }

    return (
        <div className="header">
          <Link to="/">
            <div className="header-logo">
                <img src="https://kstatic.googleusercontent.com/files/f4b4fbcc6119576da7ab3f68270196009fc1b16f1927910842d793c385115593b6dd5fbe9a1e21fe64f3cbbc509c3a02c95ebc9635f76c355282482986f1fe7d" alt=""/>
                <span>Drive</span>
            </div>
            </Link>
            <div className="header-search-container">
            <div className="header-search-bar">
                <label htmlFor="searchbar">
                  <SearchIcon/>
                </label>
                <input id="searchbar" type="text" placeholder="Search in Drive"/>
                <ExpandMoreIcon/>
            </div>
            </div>
            <div className="header-icons">
                <span>
                    <HelpOutlineIcon/>
                    <SettingsIcon className="setting"/>
                    <AppsIcon/>
                </span>
                <img title={email} src={userPhoto} alt="profile" onClick={()=>setOpen(!open)}/>
                {
                 open&&(
                <div className="pofile">
                   <h4>{name}</h4>
                   <p>{email}</p>
                   <button className="signoutbtn" onClick={handleSignout}>Sign Out</button>
                </div>
                 )
               }
            </div>
        </div>
    )
}

export default Header
