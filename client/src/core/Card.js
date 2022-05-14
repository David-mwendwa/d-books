import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

const Card = ({ product, showViewProductButton = true }) => {
  return (
    <div className='card'>
      <div className='card-header name'>{product.name}</div>
      <div className='card-body'>
        <ShowImage item={product} url='product' />
        <p className='lead mt-3'>
          {product && product.description}
        </p>
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

          <button className='btn btn-outline-warning mt-2 mb-2'>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
