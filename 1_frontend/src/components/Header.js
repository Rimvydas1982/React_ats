import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div>Dashboard</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Login page</Link>
          </li>
          <li>
            <Link to='/admin'>Admin Page</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
