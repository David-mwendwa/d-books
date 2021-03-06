import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { logGreeting } from '../utils/logGreeting';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: '',
    formData: '',
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    for (const value of formData.values()) {
      console.log({ value });
    }
    setValues({ ...values, error: '', loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          price: '',
          category: '',
          shipping: '',
          quantity: '',
          photo: '',
          loading: false,
          createdProduct: data.name,
        });
        setTimeout(() => navigate('/admin/dashboard'), 2000);
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
      style={{ display: createdProduct ? '' : 'none' }}>
      {`${createdProduct} is created`}
    </div>
  );

  const showLoading = () =>
    loading && <div className='alert alert-success'>Loading...</div>;

  const newPostForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className='form-group'>
        <label className='btn btn-secondary'>
          <input
            onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image/*'
          />
        </label>
      </div>
      <div className='form-group'>
        <label htmlFor='name_field'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='description_field'>Description</label>
        <textarea
          onChange={handleChange('description')}
          type='text'
          className='form-control'
          value={description}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='price_field'>Price</label>
        <input
          onChange={handleChange('price')}
          type='Number'
          className='form-control'
          value={price}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='category_field'>category</label>
        <select onChange={handleChange('category')} className='form-control'>
          <option>Select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='quantity_field'>Quantity</label>
        <input
          onChange={handleChange('quantity')}
          type='Number'
          className='form-control'
          value={quantity}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='shipping_field'>Shipping</label>
        <select onChange={handleChange('shipping')} className='form-control'>
          <option>Select</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div>
      <button className='btn btn-outline-primary'>Create Product</button>
    </form>
  );

  const { user, token } = isAuthenticated();

  return (
    <Layout
      title='Add a new product'
      description={`${logGreeting(user.name)}. Ready to add a new product?`}>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
