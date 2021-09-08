import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext } from './../App';
import Button from '../components/Button';
import style from '../styles/AdminPage.module.css';

const AdminPage = () => {
  //Hooks
  //--global
  const { dispatch } = useContext(UserContext);
  //--local state
  const [count, setCount] = useState(1);
  const [teams, setTeams] = useState([]);
  const [votes, setVotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //--redirecting
  const history = useHistory();
  //side effects
  useEffect(() => {
    if (isLoading) {
      axios.get('http://localhost:5000/api/teamsvotes').then((response) => {
        setTeams(response.data);
        setIsLoading(false);
      });
    }
    axios.get('http://localhost:5000/api/votes').then((response) => {
      setVotes(response.data);
    });
  }, [isLoading]);

  //Custom functions

  let rated = useRef(false);

  const decrement = (id) => {
    if (!rated.current) {
      setCount(count - 1);
      rated.current = true;

      //fetching (using axios ar fetch ) data from API withPOST/PUT method
    }
    return;
  };
  const increment = (id) => {
    if (!rated.current) {
      setCount(count + 1);
      rated.current = true;

      //fetching (using axios ar fetch ) data from API withPOST/PUT method
    }
    return;
  };

  const logOutUser = () => {
    dispatch({ type: 'LOGOUT', user: '' });
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <main className={style.main}>
      <Button text='LOGOUT' action={logOutUser} />
      <h2>All teams</h2>

      <section className={style.section}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          teams.map((item) => (
            <div key={item._id}>
              <h2>{item.name}</h2>
              <h3>{item.location}</h3>
              <h4>Score: {count}</h4>
              <Button text='-' action={() => decrement(item._id)} />
              <Button text='+' action={() => increment(item._id)} />
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default AdminPage;
