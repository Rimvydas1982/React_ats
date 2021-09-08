import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const Header = () => {
  //Hooks
  //--state
  const { state, dispatch } = useContext(UserContext);
  //--side effects
  useEffect(() => {
    //if user is loged in
    if (localStorage.getItem('user')) {
      console.log('User founded');
      dispatch({
        type: 'LOGIN',
        payload: localStorage.getItem('user'),
      });
    } else {
      console.log('user not founded');
    }
  }, [dispatch]);
  return (
    <header>
      <div>Dashboard</div>
      <nav>
        <ul>
          {state.user ? (
            <li>
              <Link to='/admin'>Admin Page</Link>
            </li>
          ) : (
            <li>
              <Link to='/'>Login page</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
