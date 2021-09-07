import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from '../components/Button';

const AdminPage = () => {
  //Hooks
  //--local state
  const [count, setCount] = useState(1);
  const [teams, setTeams] = useState([]);
  const [votes, setVotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <div>
      <h2>Admin</h2>
      <h5>All teams</h5>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        teams.map((item) => (
          <div key={item._id}>
            <h2>{item.name}</h2>
            <h3>{item.location}</h3>
            <h4>Score: {count}</h4>
            <Button text='-' action={() => decrement(item._id)} />
            <Button text='+' />
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
