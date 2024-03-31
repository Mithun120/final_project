import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage items
    localStorage.removeItem('userType');
    localStorage.removeItem('isLoggedIn');

    // Call setIsLoggedIn to update the state
    setIsLoggedIn(false);
    toast.info('You have been logged out');

    // Use navigate to redirect to the login page
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

