import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import style from '../styles/Header.module.css';

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
    <header className={style.header}>
      <div className={style.container}>
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
      </div>
    </header>
  );
};

export default Header;
