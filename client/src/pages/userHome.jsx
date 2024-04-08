import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Logout } from '../component/Logout';
import "../styles/adminhome.css"
import { useNavigate } from 'react-router-dom';

function ResourceAllocation({ setIsLoggedIn }) {
  const navigate=useNavigate()

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
      <h2 className='dashboard-heading'>User Dashboard</h2>
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
