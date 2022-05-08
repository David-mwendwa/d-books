import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { logGreeting } from '../utils/logGreeting';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // make request to api to create catergory
  };

  const newCategoryFrom = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label htmlFor='name_field' className='text-muted'>
          Name
        </label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          autoFocus
        />
      </div>
      <button className='btn btn-outline-primary'>Create Category</button>
    </form>
  );

  return (
    <Layout
      title='Add a new category'
      description={`${logGreeting(user.name)}. Ready to add a new category?`}>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>{newCategoryFrom()}</div>
      </div>
    </Layout>
  );
};

export default AddCategory;
