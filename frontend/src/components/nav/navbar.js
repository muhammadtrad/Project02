import React from 'react';
import { Link } from 'react-router-dom'
import '../../css/navbar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e){
        e.preventDefault();
        this.props.logout();
    }

    getLinks(){
        if (this.props.loggedIn) {
            return (
               <div className = 'navbar'>
                   <Link className='navbar-li' to={'/example1'}>Home</Link>
                   <Link className='navbar-li' to={'/profile'}>Profile</Link>
                   <Link className='navbar-li' to={'/example2'}>Account</Link>
                   <button onClick={this.logoutUser} className = 'navbar-logout'>Logout</button>
               </div>
            );
        } else {
            return (
                <div className = 'navbar'>
                <Link to={'/signup'} className = "navbar-li">Signup</Link>
                <Link to={'/login'} className = "navbar-li">Login</Link>
                </div>
            );
        }
    }

    render() {
        return(
            <div className = "navbar-container">
                <h1 className = 'navbar-title'>LanguageAI</h1>
                { this.getLinks() }
            </div>
        );
    }
}

export default NavBar;