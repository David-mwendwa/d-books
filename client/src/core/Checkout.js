import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
  
const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {isAuthenticated() ? (
        <button className='btn btn-success'>Checkout</button>
      ) : (
        <Link to='/signin'>
          <button className='btn btn-primary'>Sign In to checkout</button>
        </Link>
      )}
    </div>
  );
};

export default Checkout;
