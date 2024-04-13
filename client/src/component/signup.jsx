import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/signup.css'; // Assuming this is your CSS file for styling
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Signup = ({ isLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/signup', {
        name: name,
        email: email,
        userType: userType,
        role: role
      },{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });

      if (response.status === 201) {
        toast.success("User registered successfully! the email is sent to the user")
       navigate('/adminhome')
        // Redirect or perform actions based on successful signup
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during signup.');
    }

    setLoading(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  return (
    <div className='login-bg'>
      <div className='leftPanel'>
        <div className='inner-login'>
          <h1>Create account</h1>
          <p>Create New User</p>
          <form className='login-form' onSubmit={handleSubmit}>
            <div className='login-input-row'>
              <label><span>Name:</span></label>
              <input type='text' value={name} onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown} placeholder='Enter your Name' />
            </div>
            <div className='login-input-row'>
              <label><span>Email:</span></label>
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} placeholder='Enter your E-Mail Address' />
            </div>
            <div className='login-input-row'>
  <label><span>User Type:</span></label>
  <select
    value={userType}
    onChange={(e) => setUserType(e.target.value)}
    onKeyDown={handleKeyDown}
    style={{
      padding: '8px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #B2ECEF',
      backgroundColor: '#fff',
      color: '#333',
      cursor: 'pointer',
      outline: 'none',
      width: '200px',
      marginBottom: '20px', // Add margin bottom for space
    }}
  >
    <option value='user'>User</option>
    <option value='admin'>Admin</option>
  </select>
</div>
<div className='login-input-row'>
  <label><span>Role:</span></label>
  <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    onKeyDown={handleKeyDown}
    style={{
      padding: '8px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #B2ECEF',
      backgroundColor: '#fff',
      color: '#333',
      cursor: 'pointer',
      outline: 'none',
      width: '200px',
      marginBottom: '20px', // Add margin bottom for space
    }}
  >
    <option value='Intern'>Intern</option>
    <option value="Software Engineer">Software Engineer</option>
    <option value="Consultant">Consultant</option>
    <option value="Tribe Master">Tribe Master</option>
  </select>
</div>

            <div className='login-input-row'>
              <button type='submit' className='login-button' disabled={loading}>Create</button>
            </div>
          </form>
          {/* {error && <p className='error-msg'>{error}</p>} */}
        </div>
      </div>
      <div className='rightPanel'>
        <img src='https://static.wixstatic.com/media/922e4b_e8df0d769b82457a8225ba81357cce83~mv2.png/v1/fill/w_583,h_549,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/922e4b_e8df0d769b82457a8225ba81357cce83~mv2.png' className='login-img' alt='login-img' />
      </div>
    </div>
  );
};
