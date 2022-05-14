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
  }, [productId]);

  return (
    <Layout
      title='Home Page'
      description='D-Books | MERN Stack E-Commerce App'
      className='container-fluid'>
      <h2 className='mb-4'>Single Product</h2>
      <div className="row">
        {JSON.stringify(product)}
      </div>
    </Layout>
  );
};

export default Product;
