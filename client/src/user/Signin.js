import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth/index';

const Signin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
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

  const showLoading = () => {
    loading && (
      <div className='alert alert-info'>
        <h2>Loading</h2>
      </div>
    );
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    }
  };

  const signUpForm = () => (
    <form>
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
      title='Signin'
      description='Signin to D-Books App'
      className='container col-md-8 offset-md-2'>
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
