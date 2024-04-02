import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './Feedback.css';
 
function Feedback() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
 
  useEffect(() => {
    // Fetch user email from session storage
    const responseEmail = sessionStorage.getItem('responseEmail');
   
    // If email is present, send request to backend to fetch user details
    if (responseEmail) {
      fetchUserData(responseEmail);
    }
  }, []);
 
  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users/userdetails/${email}`);
      const userData = response.data;
      setUserRole(userData.role);
      setUserId(userData.id);
      setUserFirstName(userData.firstName);
 
      // Based on the user's role, navigate to respective pages
      navigateToRole(userData.role);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
 
  const navigateToRole = (role) => {
    switch (role) {
      case 'Intern':
        navigate('/internfeedbackform', { state: { userId } });
        break;
      case 'Software Engineer':
        navigate('/generalfeedbackform', { state: { userId } });
        break;
      case 'Consultant':
        navigate('/consultantfeedbackform', { state: { userId } });
        break;
      case 'Tribe Master':
        navigate('/tribemasterfeedbackform', { state: { userId } });
        break;
      default:
        console.error('Invalid role:', role);
    }
  };
 
  return (
    <div className="feedback-box">
      <div className="feedback-dashboard-container">
        <h2 className="feedback-heading">Role of the User: {userRole}</h2>
        <p>Welcome, {userFirstName}!</p>
      </div>
    </div>
  );
}
 
export default Feedback;