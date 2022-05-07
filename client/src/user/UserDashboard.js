import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'>User Links</h4>
        <li className='list-group-item'>
          <Link to='/cart' className='nav-link'>
            My Cart
          </Link>
        </li>
        <li className='list-group-item'>
          <Link to='/profile/update' className='nav-link'>
            Update Profile
          </Link>
        </li>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>
        <ul className='list-group'>
          <li className='list-group-item'>ID: {_id}</li>
          <li className='list-group-item'>Name: {name}</li>
          <li className='list-group-item'>Email: {email}</li>
          <li className='list-group-item'>
            Role: {role === 1 ? 'Admin' : 'Registered User'}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Purchase history</h3>
        <ul className='list-group'>
          <li className='list-group-item'>history</li>
        </ul>
      </div>
    );
  };

  const logGreeting = (name = 'user') => {
    let date = new Date();
    let hrs = date.getHours();
    let greeting;
    if (hrs < 12) greeting = `Good Morning, ${name}`;
    else if (hrs >= 12 && hrs <= 17) greeting = `Good Afternoon, ${name}`;
    else if (hrs >= 17 && hrs <= 24) greeting = `Good Evening, ${name}`;
    return greeting;
  };

  return (
    <Layout
      title='Dashboard'
      description={logGreeting(name)}
      className='container'>
      <div className='row'>
        <div className='col-3'>{userLinks()}</div>
        <div className='col-9'>
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
