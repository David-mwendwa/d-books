import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminRoute from './auth/AdminRoute';
import PrivateRoute from './auth/PrivateRoute';
import Home from './core/Home';
import AdminDashboard from './user/AdminDashboard';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashboard from './user/UserDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
// import Cart from './core/Cart.new';

const _Routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/shop' element={<Shop />} exact />
        <Route path='/signin' element={<Signin />} exact />
        <Route path='/signup' element={<Signup />} exact />

        <Route path='/product/:productId' element={<Product />} exact />

        <Route
          path='/user/dashboard'
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
          exact
        />

        <Route
          path='/admin/dashboard'
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
          exact
        />
        <Route
          path='/create/category'
          element={
            <AdminRoute>
              <AddCategory />
            </AdminRoute>
          }
          exact
        />
        <Route
          path='/create/product'
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
          exact
        />

        <Route path='/cart' element={<Cart />} exact />
      </Routes>
    </BrowserRouter>
  );
};

export default _Routes;
