import React, { useState } from 'react';
import Layout from '../core/Layout';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

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
        />
      </div>
      <button className='btn btn-primary'>Submit</button>
    </form>
  );
  return (
    <Layout
      title='Signup'
      description='Signup to D-Books App'
      className='container col-md-8 offset-md-2'>
      {signUpForm()}
      {JSON.stringify(values)}
    </Layout>
  );
};

export default Signup;
