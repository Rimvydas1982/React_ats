import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//Pages

import AdminPage from './pages/AdminPage';

const ProtectedRoute = () => {
  //Hooks

  //redirects
  const history = useHistory();

  //--side effects
  useEffect(() => {
    //if user not exists redirecting to login
    if (!localStorage.getItem('user')) {
      history.push('/');
    }
  });

  return <AdminPage />;
};

export default ProtectedRoute;
