import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const isActive = (location, path) => {
  if (location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = () => {
  const location = useLocation();

  return (
    <div>
      <ul className='nav nav-tabs bg-primary'>
        <li className='nav-item'>
          <Link to='/' className='nav-link' style={isActive(location, '/')}>
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/signin'
            className='nav-link'
            style={isActive(location, '/signin')}>
            Signin
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/signup'
            className='nav-link'
            style={isActive(location, '/signup')}>
            Signup
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
