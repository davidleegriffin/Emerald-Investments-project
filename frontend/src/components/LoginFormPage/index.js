import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    resetForm();
    return dispatch(sessionActions.login({ credential, password }))
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };

  const demoSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    resetForm();
    return dispatch(sessionActions.demoLogin( ))
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };

  const resetForm = () => {
    document.getElementById("loginForm").reset();
  };

  // resetForm();

  return (
    <div className="form-wrapper">

      <ul className="login__errors">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
<<<<<<< HEAD
      <h2>Login</h2>  
      <div className="input-wrapper">
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required=""
          className="login-form__name"
          name=""
        />
        <label className="login-form__label--name">Username or Email</label>
      </div>
      <div className="input-wrapper">  
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required=""
          className="login-form__password"
            name=""
        />
        <label className="login-form__label--password">Password</label>
      </div>  
      <button type="submit" className="login-form__button">Log In</button>
    </form>
    </div>
=======

      <form className="form-login" onSubmit={handleSubmit} id="loginForm" autoComplete="off">
        <div><h2>LOGIN</h2></div>
        <div className="input-wrapper">

          <input
            type="text"
            autoComplete="off"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className="login-form__input--name"
            required=" "
            name=""
          />
          <label className="login-form__label--name">Username or Email</label>

          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-form__input--password"
            required=" "
            name=""
          />
          <label className="login-form__label--password">Password</label>
        <button type="submit" className="login-form__button">Log In</button>
        <button className="login-form__button--demo" onClick={demoSubmit}>Demo Login</button>
        </div>


        </form>

      </div>
>>>>>>> 554b1d46bc8ac1cee3ec7250d70d8228461faef8
  );
}

export default LoginFormPage;
