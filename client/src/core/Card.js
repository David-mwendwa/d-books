import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem } from './cartUtils';
import { updateItem, removeItem } from './cartUtils';

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
}) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(product.count);

  const addToCart = () => {
    addItem(product, () => {
      //navigate('/cart')
    });
  };

  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  return (
    <div className='card'>
      <div className='card-header name'>{product.name}</div>
      <div className='card-body'>
        <ShowImage
          item={product}
          url='product'
          styles={{ maxHeight: '100%', maxWidth: '100%' }}
        />
        <p className='lead mt-3'>{product && product.description}</p>
        <p className='black-10'>${product.price}</p>
        <p className='black-9'>
          Category: {product.category && product.category.name}
        </p>
        <p className='black-8'>
          Added on {product && moment(product.createdAt).fromNow()}
        </p>
        {product.quantity ? (
          <span className='badge badge-primary badge-pill'>In Stock</span>
        ) : (
          <span className='badge badge-primary badge-pill'>Out of Stock</span>
        )}
        <div className='d-flex justify-content-between'>
          {showViewProductButton && (
            <Link to={`/product/${product._id}`}>
              <button className='btn btn-outline-primary mt-2 mb-2'>
                View Product
              </button>
            </Link>
          )}

          {showAddToCartButton && (
            <button
              onClick={addToCart}
              className='btn btn-outline-warning mt-2 mb-2'>
              Add to cart
            </button>
          )}

          {cartUpdate && (
            <div>
              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>Adjust Quantity</span>
                </div>
                <input
                  type='number'
                  className='form-control'
                  value={count}
                  onChange={handleChange(product._id)}
                />
              </div>
            </div>
          )}

          {showRemoveProductButton && (
            <button
              onClick={() => removeItem(product._id)}
              className='btn btn-outline-danger mt-2 mb-2'>
              Remove Product
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
