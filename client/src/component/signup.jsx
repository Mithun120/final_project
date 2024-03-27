import React, { useState } from 'react';
import axios from 'axios';
import '../styles/signup.css'; // Assuming this is your CSS file for styling

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        name: name,
        email: email,
        userType: userType,
      });

      if (response.status === 201) {
        alert('User registered successfully! Please check your email for further instructions.');
        // Redirect or perform actions based on successful signup
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during signup.');
    }

    setLoading(false);
  };

  return (
    <div className='login-bg'>
      <div className='leftPanel'>
        <div className='login-inner'>
          <h1>Create account</h1>
          <p>Create New User</p>
          <form className='login-form' onSubmit={handleSubmit}>
            <div className='login-input-row'>
              <label><span>Name:</span></label>
              <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your Name' />
            </div>
            <div className='login-input-row'>
              <label><span>Email:</span></label>
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your E-Mail Address' />
            </div>
            <div className='login-input-row'>
              <label><span>User Type:</span></label>
              <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
              </select>
            </div>
            <div className='login-input-row'>
              <button type='submit' className='login-button' disabled={loading}>Create</button>
            </div>
          </form>
          {error && <p className='error-msg'>{error}</p>}
        </div>
      </div>
      <div className='rightPanel'>
        <img src='https://th.bing.com/th/id/OIP.LX8z6k712jRImF8cuiKeGQAAAA?w=173&h=180&c=7&r=0&o=5&pid=1.7' className='login-img' alt='login-img' />
      </div>
    </div>
  );
};
