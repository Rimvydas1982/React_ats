import React, { useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

export const UserContext = React.createContext();

//State Management
//--global
const initialState = { user: '' };
const reducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER':
      return { user: action.payload };
    case 'LOGIN':
      return { user: action.payload }; //Atsiustas id vartotojo
    case 'LOGOUT':
      return { user: '' };
    default:
      return state;
  }
};

function App() {
  //Hooks
  //--state
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={LoginPage} />
            <Route path='/admin' component={AdminPage} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
