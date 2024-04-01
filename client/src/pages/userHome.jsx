import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Logout } from '../component/Logout';
import TimeSheetParent from '../component/Timesheet';
function ResourceAllocation({ setIsLoggedIn }) {
  
  

  return (
    <>
<Logout  setIsLoggedIn ={ setIsLoggedIn }/>  
<TimeSheetParent/>  
</>
  );
}

export default ResourceAllocation;
