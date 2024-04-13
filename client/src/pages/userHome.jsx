import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Logout } from '../component/Logout';
import "../styles/adminhome.css"
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
function ResourceAllocation({ setIsLoggedIn }) {
  const navigate=useNavigate()
  const emaildata=sessionStorage.getItem('email').split('@')[0]




  const handleCall=()=>{
    navigate('/timesheet')
  }
  const handleCallFeedback=()=>{
    navigate('/feedback')
  }
  return (
    <>
    <div className="admin-dashboard">
      <div className='admin-heading'>
 
      <h4 style={{ color: '#22223b', textAlign: 'center' }}>
    <img src="https://cdn3.iconfinder.com/data/icons/flat-classy-users-1/256/Male_SkinTone2_HairStyle2-512.png" alt="Profile Image" style={{ height: 40, width: 40 }}></img>
    <br />
    {emaildata}
</h4>

      
      <h2 className='dashboard-heading' style={{ color: '#051923'}}>User Dashboard</h2>
      <button onClick={()=>handleCall()} className='button-62' >TimeSheet</button>
      <button onClick={()=>handleCallFeedback()} className='button-62' >Feedback</button>
      {/* <Timesheet/> */}
      {/* <button onClick={handleResourceAllocation}>Resource Allocation</button> */}
      <Logout setIsLoggedIn ={ setIsLoggedIn } className='button-62'/>
      </div>
    </div>
</>
  );
}

export default ResourceAllocation;
