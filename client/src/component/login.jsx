// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post('http://localhost:3000/login', {
//         email: email,
//       });

//       if (response.status === 200) {
//         alert(response.data.message); // Display success message from the backend
//         // Redirect or perform actions based on the response from the backend
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred during login.');
//     }

//     setLoading(false);
//   };

//   return (
//     <div>
//       <div className='login-bg'>
//         <div className="leftPanel">
//           <div className='login-inner'>
//             <h1>Login</h1>
//             <p>Login to your account</p>
//             <form className='login-form' onSubmit={handleLogin}>
//               <div className='login-input-row'>
//                 <label> <span>Email:</span></label>
//                 <InputText
//                   type='text'
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder='Enter your E-Mail Address'
//                   style={{ marginLeft: "35px" }}
//                 />
//               </div>
//               <Button
//                 type='submit'
//                 className="login-button"
//                 label='Login'
//                 disabled={loading}
//               />
//             </form>
//           </div>
//         </div>
//         <div className="rightPanel">
//           <img src="https://cdni.iconscout.com/illustration/premium/thumb/male-freelancer-working-on-laptop-4202191-3484369.png" className='login-img' alt='login-img'></img>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import "../styles/signup.css"
import 'react-toastify/dist/ReactToastify.css';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';


export const Login = ({ setIsLoggedIn }) => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirPass, setConfirmPass] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedLogin, setSelectedLogin] = useState(true);
  const [selectedForget, setSelectedForget] = useState(false);
  const [selectedOtp, setSelectedOtp] = useState(false);
  const [selectedReset, setSelectedReset] = useState(false);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const auth=useAuth();

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/login', {
        email: email,
        password: pass
      });

      console.log(response)
      if (response.status === 200 && response.data.userType === "admin") {
        // alert(response.data.message);
        setIsLoggedIn(true)
        navigate("/signup")
        // Display success message from the backend
        // Redirect or perform actions based on the response from the backend
      }
      else if (response.status === 200 && response.data.userType === "user") {
        // alert(response.data.message);
        setIsLoggedIn(true)
        navigate("/signup")
        // Display success message from the backend
        // Redirect or perform actions based on the response from the backend
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login.');
    }

    setLoading(false);
  };

  const handleGetMail = (e) => {
    e.preventDefault();
    if (selectedOption === "") {
      toast.warn("Select Type of user");
    }
    else {
      setLoading(true);
      sendMail(email).then((response) => {
        setLoading(false);
        setSelectedOtp(true);
        setSelectedForget(false);
      }).catch((error) => {
        toast.error("Invalid Email");
        setLoading(false);
      })
    }
  }

  return (
    <div class='container'>
      <div className='login-bg'>
        <div className="leftPanel">
          {selectedLogin && (
            <div className='login-inner'>
              <h1>
                Login
              </h1>
              <p>Login to your account</p>
              <div className='login-form'>
                <div className='login-input-row'>
                  <label> <span>Email:</span></label>
                  <InputText type='text' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your E-Mail Address' style={{ marginLeft: "35px" }} />

                </div>
                <div className='login-input-row'>
                  <label><span>Password:</span></label>
                  <Password style={{ width: "100%" }} feedback={false} onChange={(e) => setPass(e.target.value)} value={pass} placeholder='Enter your Password' toggleMask></Password>
                </div>
                <button onClick={() => handleForgetPassword()} className='forget-pass'>Forgot Password?</button>
                <Button onClick={handleLogin} className="login-button">Login</Button>
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
          {selectedOtp && (
            <div className='login-inner'>
              <p>OTP Verification</p>
              <form style={{ marginTop: "50px" }} className='login-form' onSubmit={handleResetPassword}>
                <div className='login-input-row' style={{ marginBottom: "30px" }}>
                  <label> <span>OTP:</span></label>
                  <InputText type='text' onChange={(e) => setOtp(e.target.value)} placeholder='Enter your OTP' style={{ marginLeft: "35px" }} />
                </div>
                <div className='login-input-row' style={{ marginBottom: "30px" }}>
                  <label> <span>New Password:</span></label>
                  <InputText type='text' onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter New Password' style={{ marginLeft: "35px" }} />
                </div>
                <Button className="login-button">Verify</Button><br></br>
                <Button className="cancel-button" onClick={() => handleCancel()}>Cancel</Button>

              </form>
            </div>
          )}
        </div>
        <div className="rightPanel">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/male-freelancer-working-on-laptop-4202191-3484369.png" className='login-img' alt='login-img'></img>
        </div>
      </div></div>
  )
}