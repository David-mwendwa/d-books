import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import { read } from './apiCore';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [error, setError] = useState();

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      setProduct(data);
    });
  };

  useEffect(() => {
    loadSingleProduct(productId);
  }, []);

  return (
    <Layout
      title={product && product.name}
      description={product && product.description}
      className='container-fluid'>
      <h2 className='mb-4'>Single Product</h2>
      <div className='row'>
        {product && (
          <div className='col-8 mb-3'>
            <Card product={product} showViewProductButton={false} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Product;
