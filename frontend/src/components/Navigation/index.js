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
      <div className="login-container__wrapper">
        <div className="login-container-div">
          <NavLink className="navbar-links__login" to="/login">Log In</NavLink>
        </div>
        <span className="navbar-span">OR</span>
        <div className="login-container-div">
          <NavLink className="navbar-links__login" to="/signup">Sign Up</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div id="navbar" className="navbar-container">
      <div className="home">
        <div className="emerald-wrapper">
          <img className="navbar__image--emerald" src="./images/emerald.png" width="30px" alt="emerald-logo" />
        </div>
        <NavLink className="navbar-links__home" exact to="/">Emerald Investments</NavLink>
      </div>
      <div className="login">
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
