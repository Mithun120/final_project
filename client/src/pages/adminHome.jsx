import React from 'react';
import "../styles/adminhome.css"
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
 
  const handleAllocateProject = () => {
    navigate('/projectallocate'); // Assuming '/resourceAllocation' is the route for resource allocation
  };
 
  return (
    <div className="admin-dashboard">
      <div className='admin-heading'>
      <h2 className='dashboard-heading'>Admin Dashboard</h2>
      <button onClick={handleAddUser} className='button-62'>Add User</button>
      <button onClick={handleAddProject} className='button-62' >Add Project</button>
      <button onClick={handleAllocateProject} className='button-62' >Project Allocation</button>
      {/* <button onClick={handleResourceAllocation}>Resource Allocation</button> */}
      <Logout setIsLoggedIn ={ setIsLoggedIn } />
      </div>
    </div>
  );
}
 
export default Admindashboard;