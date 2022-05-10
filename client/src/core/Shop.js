import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';

const Shop = () => {
  return (
    <Layout
      title='Shop'
      description='Search and find books of your choice | D-Books'
      className='container-fluid'>
      <div className='row'>
        <div className='col-4'>left sidebar</div>
        <div className='col-8'>right</div>
      </div>
    </Layout>
  );
};

export default Shop;
