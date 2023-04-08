import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import App from './App';
import Customer from './Customer';
import NotFound from './NotFound';

function Router() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Navigation />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/Customer' element={<Customer />} />
        <Route element={<NotFound />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default Router;