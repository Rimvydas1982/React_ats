import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from '../components/Button';

const AdminPage = () => {
  //Hooks
  //--local state

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
  let liked = useRef(false);
  //Custom functions
  const increment = () => {
    if (!liked.current) {
      const [newArray] = votes.map((item) => item.vote);
      liked.current = true;
      console.log(newArray);

      //fetching (using axios ar fetch ) data from API withPOST/PUT method
    }
    return;
  };
  const decrement = () => {
    console.log(votes.map((ti) => ti.vote) + 1);
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
            <h4>{item.rating}</h4>
            {item.vote.map((it) => (
              <h4> Score: {it.vote}</h4>
            ))}
            <Button text='-' action={decrement} />
            <Button text='+' action={increment} />
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
