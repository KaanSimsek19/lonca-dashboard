import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage'
import Dashboard from './components/HomePage/Dashboard';

function AppRouter() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage></LoginPage>}></Route>
            <Route path='/login' element={<LoginPage></LoginPage>}></Route>
            <Route path='/home' element = {<Dashboard></Dashboard>}></Route>
        </Routes>
    </BrowserRouter>

  );
}

export default AppRouter