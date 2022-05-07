import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';

const _Routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/signin' element={<Signin />} exact />
        <Route path='/signup' element={<Signup />} exact />
      </Routes>
    </BrowserRouter>
  );
};

export default _Routes;
