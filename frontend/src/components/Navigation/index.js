import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div>
        <div className="login-container-div">
          <NavLink className="navbar-links__login" to="/login">Log In</NavLink>
            <span className="navbar-span">or</span>
          <NavLink className="navbar-links__login" to="/signup">Sign Up</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar-container">
      <div className="home">
        <div className="emerald-wrapper">
          <img src="./images/emerald.png" width="30px" />
        </div>
        <NavLink className="navbar-links__home" exact to="/">Home</NavLink>
      </div> 
      <div className="login">
        {isLoaded && sessionLinks}
      </div>  
    </div>
  );
}

export default Navigation;