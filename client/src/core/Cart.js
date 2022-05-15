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
        <div className='col-6'>
          <h2>Your cart has {`${items.length}`} items</h2>
          <hr />
          {items.length ? (
            items.map((product, i) => <Card key={i} product={product} />)
          ) : (
            <h2>
              Your cart is empty <br />{' '}
              <Link to='/shop'>Continue shopping</Link>
            </h2>
          )}
        </div>
        <div className="col-6">
          <p>Show checkout options/shipping address/total/update quantity</p>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
