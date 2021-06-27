import React from 'react';
import { connect } from 'react-redux';
import {loginWithGoogle} from './actions'
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Header from './Components/header/Header'
import Sidebar from './Components/sidebar/Sidebar'
import FileView from './Components/fileview/FileView';
import Starred from './Components/Starred/Starred';
import './App.css';
import {handleSiderbar} from './actions'
import { Component } from 'react';
class App extends Component {
    render(){
         return(
             <>
             {
                this.props.auth.isEmpty?(
                <div className="app_login">
                     <img src={'https://kstatic.googleusercontent.com/files/f4b4fbcc6119576da7ab3f68270196009fc1b16f1927910842d793c385115593b6dd5fbe9a1e21fe64f3cbbc509c3a02c95ebc9635f76c355282482986f1fe7d'}/>
                     <button onClick={this.props.loginWithGoogle}> <div className="icon"><img src="https://img.icons8.com/color/2x/google-logo.png"/></div> <p> Login with Google</p></button>
                     <p className="dev">From Jaydeep</p>
                </div>
                ):(
                    <>
            <Router>
             <Header/>
             </Router>
             <div className="hero">
               <div className="burger" onClick={()=>this.props.handleSiderbar(!this.props.isSidebarOpen)} >
                <MenuIcon/>
               </div>
            
            <Router>
                   <Sidebar/>
                    <Route path="/starred" component={Starred}/>
                   <Route exact  path='/' component={FileView}/>
   
            </Router>
            </div>
            </>
                )
             }
             </>
    );
}
}
 const mapStateToProps=(state)=>{
    return{
        auth:state.firebase.auth,
        isSidebarOpen:state.siderbar.sidebarOpen,
    }
 }
 
export default connect(mapStateToProps,{loginWithGoogle,handleSiderbar})(App);
