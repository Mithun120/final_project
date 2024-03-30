import React, { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import '../styles/changePassword.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate()
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:4000/update', {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
  
      if (response && response.data && response.data.message) {
        toast.success("Your Password has been changed")
        navigate("/")
        // alert(response.data.message); // Display success message from the backend
        // Redirect or perform actions based on the response from the backend
      } else {
        console.error('Invalid response format:', response);
        alert('An error occurred during password change.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during password change.');
    }
  
    setLoading(false);
  };
  
  return (
    <div className='change-password-container'>
      <h1>Change Password</h1>
      <form className='change-password-form' onSubmit={handlePasswordChange}>
        <div className='form-group'>
          <label>Email:</label>
          <InputText
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            className='p-inputtext'
          />
        </div>
        <div className='form-group'>
          <label>Old Password:</label>
          <InputText
            type='password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder='Enter your old password'
            className='p-inputtext'
          />
        </div>
        <div className='form-group'>
          <label>New Password:</label>
          <InputText
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='Enter your new password'
            className='p-inputtext'
          />
        </div>
        <Button
          type='submit'
          label='Change Password'
          className=' p-button-success'
          disabled={loading}
        />
      </form>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
    </div>
  );
};

export default ChangePassword;
