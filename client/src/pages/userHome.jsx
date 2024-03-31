import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Logout } from '../component/Logout';
function ResourceAllocation({ setIsLoggedIn }) {
  
  

  return (
    <>
<Logout  setIsLoggedIn ={ setIsLoggedIn }/>    
</>
  );
}

export default ResourceAllocation;
