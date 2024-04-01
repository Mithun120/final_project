import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { Signup } from './component/signup'
import  Login  from './component/login'
import ChangePassword from './component/changePassword';
import ResetPassword from './component/forgotPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Addproject from './component/Addproject';
import ResourceAllocation from './pages/userHome';
import Admindashboard from './pages/adminHome';
import  Feedback  from './component/Feedback';
import { Logout } from './component/Logout';
import ProjectAllocationForm from './component/projectAllocation';
import TimeSheetParent from './component/Timesheet';
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
        <Route path="/project" element={<Addproject />}/>
        <Route path="/userhome" element={<ResourceAllocation setIsLoggedIn={ setIsLoggedIn }/>}/>
        <Route path="/adminhome" element={<Admindashboard setIsLoggedIn ={ setIsLoggedIn } />}/>
        <Route path="/timesheet" element={<TimeSheetParent />}/>
        <Route path="/feedback" element={ <Feedback />}/>
        <Route path="/projectallocate" element={<ProjectAllocationForm/>}/>
        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />  
           </Routes>
    </BrowserRouter>
    
  )
}

export default App
