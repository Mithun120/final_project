import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Logout } from '../component/Logout';
import TimeSheetParent from '../component/Timesheet';
import "../styles/adminhome.css"

function ResourceAllocation({ setIsLoggedIn }) {
  
  

  return (
    <>
    <div className="admin-dashboard">
      <div className='admin-heading'>
      <h2 className='dashboard-heading'>User Dashboard</h2>
      
      {/* <button onClick={handleResourceAllocation}>Resource Allocation</button> */}
      <Logout setIsLoggedIn ={ setIsLoggedIn } className='button-62'/>
      </div>
    </div>
<TimeSheetParent/>  
</>
  );
}

export default ResourceAllocation;
