import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import {read, getProducts, listRelated } from './apiCore';
import Card from './Card';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState();

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      setProduct(data);
      // fetch related products
      listRelated(data._id).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setRelatedProducts(data);
        }
      });
    });
  };

  useEffect(() => {
    loadSingleProduct(productId);
  }, [productId]);

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
        <div className='col-4'>
          <h4>Related Products</h4>
          {relatedProducts.map((product, i) => (
            <div className='mb-3' key={i}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );  
};

export default Product;
