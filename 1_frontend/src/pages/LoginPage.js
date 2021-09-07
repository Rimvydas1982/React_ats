import React, { useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './../App';

const LoginPage = () => {
  //Hooks
  //--local state
  //----global
  const { dispatch } = useContext(UserContext);
  //----login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  //----signup form

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupLocation, setSignupLocation] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupErrorMessage, setSignupErrorMessage] = useState('');

  //--Refs
  const inputRef = useRef();
  const signupPasswordInputRef = useRef();
  const signupEmailInputRef = useRef();

  //--redirecting
  const history = useHistory();

  //Custom function
  const loginUser = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/users/login', {
        email: loginEmail,
        password: loginPassword,
      })
      .then((response) => {
        const userId = response.data.userId;

        localStorage.setItem('user', userId);

        dispatch({ type: 'LOGIN', payload: userId });

        history.push('/admin');
      })
      .catch((err) => {
        setLoginEmail('');
        setLoginPassword('');
        setLoginErrorMessage(err.response.data.message);

        inputRef.current.focus();
      });
  };

  const signupUser = (e) => {
    e.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
      setSignupErrorMessage('Pasword do not match');

      setSignupPassword('');
      setSignupConfirmPassword('');

      signupPasswordInputRef.current.focus();

      return;
    }
    axios
      .post('http://localhost:5000/api/users/signup', {
        name: signupName,
        location: signupLocation,
        email: signupEmail,
        password: signupPassword,
      })
      .then((response) => {
        if (response.data.registrationStatus === 'failed') {
          setSignupErrorMessage(response.data.message);
          setSignupEmail('');
          setSignupPassword('');
          setSignupConfirmPassword('');
          signupEmailInputRef.current.focus();
        } else if (response.data.registrationStatus) {
          localStorage.setItem('user', response.data.userId);
          dispatch({ type: 'REGISTER', payload: response.data.userId });
          history.push('./admin');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div>
        <section>
          <h1>Welcome to Lithuania Teams Dashbord</h1>
        </section>

        <div className='login-signup-container'>
          <section id='login'>
            <h2>
              <span>Have you team already?</span> Log In!
            </h2>

            <form id='logInForm' onSubmit={loginUser}>
              <div>
                <label htmlFor='loginEmail'>Email</label>
                <input
                  type='email'
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  ref={inputRef}
                />
              </div>

              <div>
                <label htmlFor='loginPassword'>Password</label>
                <input
                  type='password'
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <input type='submit' value='Log In' />
              </div>
            </form>
            <p id='loginMessage'>{loginErrorMessage}</p>
          </section>
          <section id='signup'>
            <h2>
              <span>Create New Team</span>
            </h2>

            <form className='form' onSubmit={signupUser}>
              <div>
                <label htmlFor='signUpName'>Name</label>
                <input
                  type='text'
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor='signUpLocation'>Location</label>
                <input
                  type='text'
                  required
                  value={signupLocation}
                  onChange={(e) => setSignupLocation(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor='signUpEmail'>Email</label>
                <input
                  type='text'
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  ref={signupEmailInputRef}
                />
              </div>

              <div>
                <label htmlFor='signUpPassword'>Password</label>
                <input
                  type='password'
                  required
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  ref={signupPasswordInputRef}
                />
              </div>

              <div>
                <label htmlFor='signUpConfirmPassword'>Confirm Password</label>
                <input
                  type='password'
                  required
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                />
              </div>

              <div>
                <input type='submit' value='Sign Up' />
              </div>
            </form>
            <p id='signUpMessage'>{signupErrorMessage}</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
