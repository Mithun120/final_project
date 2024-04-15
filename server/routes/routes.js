let express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
let User = require("../schema/User")
let jswtUtils = require("../auth/auth_utils");
// const { default: ChangePassword } = require('../../client/src/component/changePassword');
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mithunm.20cse@kongu.edu",
      pass: "Mithun123!!",
    },
  })
 

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               userType:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '500':
 *         description: Internal server error
 */

router.post('/signup',jswtUtils.authenticateJWT, async (req, res) => {
    try {
      // Extract data from the request body
      const { name, email, userType,role } = req.body;
  
  
      const defaultPassword = Math.random().toString(36).slice(-8);
  
      // Send email using Nodemailer
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "mithunm.20cse@kongu.edu",
          pass: "Mithun123!!",
        },
      });
  
      const mailOptions = {
        from: 'mithunm.20cse@kongu.edu',
        to: email,
        subject: 'Welcome to YourApp! Please change your password',
        html: `
        <p>Dear ${name},\n\nWelcome to YourApp! Your temporary password is: ${defaultPassword}\n\nPlease login to your account and change your password as soon as possible.\n</p>
        <p>Please <a href="http://localhost:5173/changepassword">click here</a> to login to your account and change your password as soon as possible.</p>
        <p>Best regards,<br>YourApp Team</p>`
      };
  
      // Send email
      await transporter.sendMail(mailOptions);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        userType: req.body.userType,
        password:defaultPassword,
        role:req.body.role
      });
      user.save().then(result => {
        res.status(201).json({
          message: "User registered successfully!",
  
        })
      }).catch(err => {
        console.log(err),
          res.status(500).json({
            error: err
          });
      })
      // Return success response
      //   res.status(200).send('Signed up successfully. Please check your email for the default password.');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred during signup.');
    }
  });
  
  /**
 * @swagger
 * /update:
 *   post:
 *     summary: Update user's password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password updated successfully
 *       '400':
 *         description: Invalid old password or bad request
 *       '401':
 *         description: Unauthorized - Invalid old password
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
  router.post('/update', async (req, res) => {
    const { email, oldPassword, newPassword,changedPassword } = req.body;
  
    try {
      // Find the user by email
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Verify old password
      if (oldPassword !== foundUser.password) {
        return res.status(401).json({ error: 'Invalid old password.' });
      }
      
  
      // Hash the new password
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
  
      // Update user's password hash
      foundUser.password = newPasswordHash;
      foundUser.changedPassword=changedPassword
      // foundUser.changedPassword=changedPassword 
      // Save the updated user (replace with your specific save method if necessary)
      await foundUser.save();
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "mithunm.20cse@kongu.edu",
          pass: "Mithun123!!",
        },
      });
      // Send response
      const mailOptions = {
        from: 'mithunm.20cse@kongu.edu',
        to: email,
        subject: 'Password Updated',
        text: 'Your password has been updated successfully.',
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred during password update.' });
    }
  });

  /**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userType:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *       '401':
 *         description: Invalid password
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email,password)
      

      // Check if the user exists with the provided email
      const user = await User.findOne({ email });
      console.log(user)
      // if(user.changedPassword==false){
      //     return res.status(200).json({message:'Not changed Password for the 1st time'})
      // }
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!user.changedPassword){
        return res.status(200).json({message:"Pls change your default password"})
      }
      console.log("Password Match",passwordMatch)
      // Check if the provided password matches the user's password
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password.' });
      }
        
      // Check user type and send appropriate response
      if (user.userType === 'admin') {
        const accessToken = jwt.sign({ email: user.email, role:user.userType }, accessTokenSecret);
        console.log(accessToken)
        return res.status(200).json({ message: 'Welcome, admin!', userType: 'admin', email:user.email,accesstoken:accessToken });
      } else {
        
        const accessToken = jwt.sign({ email: user.email, role: user.role }, accessTokenSecret);
        console.log(user.role)
        return res.status(200).json({ message: 'Redirect to user page', userType: 'user',email:user.email,role:user.role, accesstoken:accessToken });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred during login.' });
    }
  });
  
  /**
 * @swagger
 * /forgotPassword:
 *   post:
 *     summary: Request OTP for password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
  router.post('/forgotPassword', async (req, res) => {
    try {
      const { email } = req.body;
      console.log(email)
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Generate a new OTP
      const newOTP = Math.floor(100000 + Math.random() * 900000);
  
      // Update the user's OTP in the database
      user.otp = newOTP;
      await user.save();
  
      // Send email with OTP
      const mailOptions = {
        from: 'mithunm.20cse@kongu.edu',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${newOTP}.`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: 'Failed to send OTP email' });
        }
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'OTP sent successfully' });
      });
    } catch (error) {
      console.error('Error generating OTP:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  /**
 * @swagger
 * /resetPassword:
 *   post:
 *     summary: Reset user password with OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: number
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Invalid OTP
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
  // Endpoint to handle resetting password with OTP
  router.post('/resetPassword', async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      console.log(email, otp, newPassword)
      const user = await User.findOne({ email });
      console.log(user)
  
      console.log(!user)
      console.log(user.otp , otp, user.otp !== otp)
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (user.otp != otp) {
        console.log("i am the trouble")
        return res.status(400).json({ error: 'Invalid OTP' });
      }
  
      console.log(user.password)
      // Update user's password in the database
      user.password = newPassword;
      await user.save();
  
      return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports=router