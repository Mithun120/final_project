import React from 'react';
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import "../styles/login.css"
import 'react-toastify/dist/ReactToastify.css';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { toast } from 'react-toastify';
// import { Application } from '@splinetool/runtime';

// document.addEventListener('DOMContentLoaded', () => {
//   const canvas = document.getElementById('canvas3d');
//   const app = new Application(canvas);
//   app.load('https://prod.spline.design/HNI8dc3jMlUsP2WH/scene.splinecode');
// });


const  Login = ({ setIsLoggedIn }) => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirPass, setConfirmPass] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedLogin, setSelectedLogin] = useState(true);
  const [selectedForget, setSelectedForget] = useState(false);
  const [selectedOtp, setSelectedOtp] = useState(false);
  const [selectedReset, setSelectedReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const auth=useAuth();
  const userType = localStorage.getItem('userType');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption)
  };
  const handleForgetPassword = async () => {
    try {
      // setLoading(true);
      const response = await axios.post('http://localhost:4000/forgotPassword', {
        email: email,
      });
      console.log(response)
      if (response.status === 200) {
        // Set selectedOtp to true to show OTP verification form
        setSelectedOtp(true);
        setSelectedForget(false);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      setErrorMessage('Failed to send OTP.');
    }

    // setLoading(false);
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:4000/resetPassword',
        {
          email: email,
          otp: otp,
          newPassword: newPassword,
        }
      );

      console.log("reset password", response)

      if (response.status === 200) {
        setErrorMessage('');
        setSelectedOtp(false);
        setSelectedReset(true);
      }
    } catch (error) {
      console.error('Error resetting password:', error.message);
      setErrorMessage('Failed to reset password.');
    }

    setLoading(false);
  };
  const notify = () => toast.success("Logged In");
  const handleCancel=()=>{
    setSelectedLogin(true)
    setSelectedOtp(false)
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/login', {
        email: email,
        password: pass
      });

      console.log(response.data.accesstoken)
      if (response.status === 200 && response.data.userType === "admin") {
        // alert(response.data.message);
        setIsLoggedIn(true)
        sessionStorage.setItem('accessToken', response.data.accesstoken);
        sessionStorage.setItem('email',response.data.email)
        localStorage.setItem('userType', 'admin');
      localStorage.setItem('isLoggedIn', true);
        notify()
        navigate("/adminhome")
        // Display success message from the backend
        // Redirect or perform actions based on the response from the backend
      }
      else if (response.status === 200 && response.data.userType === "user") {
        // alert(response.data.message);
        setIsLoggedIn(true)
        sessionStorage.setItem('accessToken', response.data.accesstoken);
        sessionStorage.setItem('email',response.data.email)
        localStorage.setItem('userType', 'user');
        localStorage.setItem('isLoggedIn', true);
        notify()
        navigate("/userhome")
        // Display success message from the backend
        // Redirect or perform actions based on the response from the backend
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login.');
    }

    setLoading(false);
  };

  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };
  return (
    <div className='container'>
      <div className='login-bg'>
        <div className="leftPanel">
          {selectedLogin && !selectedOtp && (
            <div className='login-inner'>
              <h1>
                Login
              </h1>
              <p>Login to your account</p>
              <div className='login-form'>
                <div className='login-input-row'>
                  <label> <span>Email:</span></label>
                  <InputText type='text' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your E-Mail Address' style={{ marginLeft: "35px" }} onKeyDown={handleKeyDown} />

                </div>
                <div className='login-input-row'>
                  <label><span>Password:</span></label>
                  <Password style={{ width: "100%" }} onKeyDown={handleKeyDown} feedback={false} onChange={(e) => setPass(e.target.value)} value={pass} placeholder='Enter your Password' toggleMask></Password>
                </div>
                <button onClick={() => handleForgetPassword()} className='forget-pass'>Forgot Password?</button>
                <Button onClick={handleLogin} className="login-button">Login</Button>
              </div>
            </div>
          )}
          {selectedOtp && (
           
           <div className='login-inner'>
             <h2>OTP Verification</h2>
             
             <div style={{ marginTop: "50px" }} className='login-form'>
               <div className='login-input-row' style={{ marginBottom: "30px" }}>
                 <label> <span>OTP:</span></label>
                 <InputText type='text' onChange={(e) => setOtp(e.target.value)} placeholder='Enter your OTP' style={{ marginLeft: "35px" }} />
               </div>
               <div className='login-input-row' style={{ marginBottom: "30px" }}>
                 <label> <span>New Password:</span></label>
                 <InputText type='text' onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter New Password' style={{ marginLeft: "35px" }} />
               </div>
               <Button className="login-button" onClick={handleResetPassword}>Verify</Button><br></br>
               <Button className="login-button" style={{backgroundColor:"red"}} onClick={() => handleCancel()}>Cancel</Button>

             </div>
           </div>
         )}
          {/* {selectedForget && (
               <div className='login-inner'>
               <p>Forget Password</p>
               <form className='login-form' onSubmit={handleGetMail}>
               <div className='login-input-row'> 
                 <label> <span>Otp:</span></label>
                 <InputText type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required/>
               </div>
               <div className='login-input-row'> 
                 <label> <span>New Password:</span></label>
                 <InputText type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
               </div>
               <Button onClick={handleResetPassword} >Reset Password</Button>
               <Button className="cancel-button" onClick={() => handleCancel()}>Cancel</Button>
             </form>
           </div>
            )} */}
          
        </div>
        <div className="rightPanel">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/male-freelancer-working-on-laptop-4202191-3484369.png" className='login-img' alt='login-img'></img>
        </div>
      </div></div>
  )
}   
export default Login