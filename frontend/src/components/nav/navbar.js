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
               <div className='navbar-links'>
                   <Link to={'/example1'}>Example1</Link>
                   <Link to={'/profile'}>Profile</Link>
                   <Link to={'/example2'}>Example2</Link>
                   <button onClick={this.logoutUser}>Logout</button>
               </div>
            );
        } else {
            return (
                <div>
                <Link to={'/signup'}>Signup</Link>
                <Link to={'/login'}>Login</Link>
                </div>
            );
        }
    }

    render() {
        return(
            <div>
                <h1>MERN APP</h1>
                { this.getLinks() }
            </div>
        );
    }
}

export default NavBar;