import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route path='/admin' component={AdminPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
