import React, { Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (location, path) => {
  if (location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <ul className='nav nav-tabs bg-primary'>
        <li className='nav-item'>
          <Link to='/' className='nav-link' style={isActive(location, '/')}>
            Home
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className='nav-item'>
            <Link
              to='/user/dashboard'
              className='nav-link'
              style={isActive(location, '/user/dashboard')}>
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className='nav-item'>
            <Link
              to='/admin/dashboard'
              className='nav-link'
              style={isActive(location, '/admin/dashboard')}>
              Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
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
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className='nav-item'>
            <span
              onClick={() => signout(() => navigate('/'))}
              className='nav-link'
              style={{ cursor: 'pointer', color: 'white' }}>
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
