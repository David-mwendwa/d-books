import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, useNavigate } from 'react-router-dom';
import { logGreeting } from '../utils/logGreeting';
import { createCategory } from './apiAdmin';

const AddCategory = () => {
  const navigate = useNavigate();
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
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError('');
        setSuccess(true);
        setTimeout(() => navigate('/admin/dashboard'), 2000);
      }
    });
  };

  const showSuccess = () => {
    if (success) {
      return (
        <p className='alert alert-success'>New category, {name}, is created</p>
      );
    }
  };

  const showError = () => {
    if (error) {
      return <p className='alert alert-danger'>Category should be unique</p>;
    }
  };

  const goBack = () => (
    <div className='mt-5'>
      <Link to='/admin/dashboard' className='text-warning'>
        Back to Dashboard
      </Link>
    </div>
  );

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
        <div className='col-md-8 offset-md-2'>
          {showSuccess()}
          {showError()}
          {newCategoryFrom()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
