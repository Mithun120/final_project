import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Signup } from './component/signup'
import { Login } from './component/login'
import ChangePassword from './component/changePassword';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/changepassword" element={<ChangePassword/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
