import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router , Route, } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Header from './Components/header/Header';
import Sidebar from './Components/sidebar/Sidebar'
import FileView from './Components/fileview/FileView';
import RightsSidebar from './Components/rightsidebar/RightsSidebar';
import Starred from './Components/Starred/Starred';
import {auth,provider} from './firebase';
import './App.css';
const App = () => {

    const [user,setUser]=useState();
    const [sidebarOpen,setSidebarOpen]=useState(false);
    const handleLogin =async()=>{
         if(!user){
            const res= await auth.signInWithPopup(provider);
            
         }
    }
    console.log(user)

    useEffect(()=>{
      const un = auth.onAuthStateChanged(user=>{
          console.log(user,'auth')
          setUser(user);
      })
      return un;
    },[])



    return (
        <div>
            {
                user?(
            <>
             <Router>
             <Header userPhoto={user.photoURL} name={user.displayName} email={user.email}/>
             </Router>
             <div className="hero">
             <div className="burger" onClick={()=>setSidebarOpen(!sidebarOpen)}>
                <MenuIcon/>
            </div>
             <Router>
                   <Sidebar currentUser={user} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
                    <Route exact path='/'>
                        <FileView currentUser={user}/>
                    </Route>
                    <Route path="/starred">
                        <Starred currentUser={user} />
                    </Route>
                </Router>
            <RightsSidebar/>
             </div>
             
             </>
             ):(
                <div className="app_login">
                     <img src={'https://kstatic.googleusercontent.com/files/f4b4fbcc6119576da7ab3f68270196009fc1b16f1927910842d793c385115593b6dd5fbe9a1e21fe64f3cbbc509c3a02c95ebc9635f76c355282482986f1fe7d'}/>
                     <button onClick={handleLogin}> <div className="icon"><img src="https://img.icons8.com/color/2x/google-logo.png"/></div> <p> Login with Google</p></button>
                     <p className="dev">From Jaydeep</p>
                </div>
                )
            }
         
         </div>
    );
}

export default App
