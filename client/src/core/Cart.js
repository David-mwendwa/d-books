import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCart, removeItem } from './cartUtils';
import Card from './Card';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [items]);

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items. Add remove, checkout or continue shopping'
      className='container-fluid'>
      <div className='row'>
        <div className='col-6'>
          <h2>Your cart has {`${items.length}`} items</h2>
          <hr />
          {items.length ? (
            items.map((product, i) => (
              <Card
                key={i}
                product={product}
                showAddToCartButton={false}
                cartUpdate={true}
                showRemoveProductButton={true}
              />
            ))
          ) : (
            <h2>
              Your cart is empty <br />{' '}
              <Link to='/shop'>Continue shopping</Link>
            </h2>
          )}
        </div>
        <div className='col-6'>
          <h2 className='mb-4'>Your cart summary</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
