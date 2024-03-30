import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { Signup } from './component/signup'
import { Login } from './component/login'
import ChangePassword from './component/changePassword';
import ResetPassword from './component/forgotPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        style={{ marginTop: '3rem' }}
        limit={1}
      />
      <Routes>

        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn}/>}  />
        <Route path="/changepassword" element={<ChangePassword/>} />
        <Route path="/resetpassword" element={<ResetPassword/>}/>
        
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
