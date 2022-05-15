/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCart } from './cartUtils';
import Card from './Card';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items> Add remove, checkout or continue shopping'
      className='container-fluid'>
      <div className='row'>
        <div className='col-8'>
          <h2>Your cart has {`${items.length}`} items</h2>
          <hr />
          {items.length &&
            items.map((product, i) => (
              <div className='card rounded-3 mb-4' key={i}>
                <div className='card-body p-4'>
                  <div className='row d-flex justify-content-between align-items-center'>
                    <div className='col-md-2 col-lg-2 col-xl-2'>
                      <img
                        src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp'
                        className='img-fluid rounded-3'
                        alt='Cotton T-shirt'
                      />
                    </div>
                    <div className='col-md-3 col-lg-3 col-xl-3'>
                      <p className='lead fw-normal mb-2'>Basic T-shirt</p>
                    </div>
                    <div className='col-md-3 col-lg-3 col-xl-2 d-flex'>
                      <button
                        className='btn btn-link px-2'
                        onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                        <i className='fa fa-minus'></i>
                      </button>

                      <input
                        id='form1'
                        min='0'
                        name='quantity'
                        value='2'
                        type='number'
                        className='form-control form-control-sm'
                      />

                      <button
                        className='btn btn-link px-2'
                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                        <i className='fa fa-plus'></i>
                      </button>
                    </div>
                    <div className='col-md-3 col-lg-2 col-xl-2 offset-lg-1'>
                      <h5 className='mb-0'>$499.00</h5>
                    </div>
                    <div className='col-md-1 col-lg-1 col-xl-1 text-end'>
                      <a href='#!' className='text-danger'>
                        <i className='fa fa-trash fa-lg'></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div className='col-lg-4 col-md-4'>
            <div className='card mb-4'>
              <div className='card-header py-3'>
                <h5 className='mb-0'>Summary</h5>
              </div>
              <div className='card-body'>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0'>
                    Products
                    <span>$53.98</span>
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center px-0'>
                    Shipping
                    <span>Gratis</span>
                  </li>
                  <li className='list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3'>
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className='mb-0'>(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>$53.98</strong>
                    </span>
                  </li>
                </ul>

                <button
                  type='button'
                  className='btn btn-primary btn-lg btn-block'>
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
