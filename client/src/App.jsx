import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from 'react';
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
import Loader from './component/Loader';
import Powerbi from './data/powerbi';
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Set loading to false after 2 seconds (you can adjust this value)

    return () => clearTimeout(timer);
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
     <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  style={{
    zIndex: 9999,
    marginTop: '3rem',
    maxWidth: '400px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f0f0f0',
    color: '#333',
    fontSize: '14px',
    padding: '16px',
  }}
/>

       {loading ? (
        <Loader />
      ) : ( 
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
        
        <Route path="/powerbi" element={<Powerbi />}/>


        <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} /> 
           </Routes>
            )} 
    </BrowserRouter>
    
  )
}

export default App
