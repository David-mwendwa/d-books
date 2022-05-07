import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../core/Layout';

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const signup = (user) => {
    return fetch(`/api/v1/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
        });
        setTimeout(() => navigate('/signin'), 3000);
      }
    });
  };

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}>
      New account is created. Please <Link to='/signin'>signin</Link>
    </div>
  );

  const signUpForm = () => (
    <form>
      <div className='form-group'>
        <label htmlFor='name_field' className='text-muted'>
          Name
        </label>
        <input
          onChange={handleChange('name')}
          type='text'
          id='name_field'
          className='form-control'
          value={name}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email_field' className='text-muted'>
          Email
        </label>
        <input
          onChange={handleChange('email')}
          type='email'
          id='email_field'
          className='form-control'
          value={email}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password_field' className='text-muted'>
          Password
        </label>
        <input
          onChange={handleChange('password')}
          type='password'
          id='password_field'
          className='form-control'
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className='btn btn-primary'>
        Submit
      </button>
    </form>
  );
  return (
    <Layout
      title='Signup'
      description='Signup to D-Books App'
      className='container col-md-8 offset-md-2'>
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
