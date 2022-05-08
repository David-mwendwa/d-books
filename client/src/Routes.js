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

const _Routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/signin' element={<Signin />} exact />
        <Route path='/signup' element={<Signup />} exact />

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
      </Routes>
    </BrowserRouter>
  );
};

export default _Routes;
