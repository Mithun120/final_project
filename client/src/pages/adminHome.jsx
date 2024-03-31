import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../component/Logout';

function Admindashboard({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate('/signup');
  };

  const handleAddProject = () => {
    navigate('/project'); // Assuming '/addProject' is the route for adding a new project
  };

  // const handleResourceAllocation = () => {
  //   navigate('/resourceAllocation'); // Assuming '/resourceAllocation' is the route for resource allocation
  // };
 

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleAddUser}>Add User</button>
      <button onClick={handleAddProject}>Add Project</button>
      {/* <button onClick={handleResourceAllocation}>Resource Allocation</button> */}
      <Logout setIsLoggedIn ={ setIsLoggedIn }/>

    </div>
  );
}

export default Admindashboard;
