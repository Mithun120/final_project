let express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

let User = require("../schema/User")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mithunm.20cse@kongu.edu",
      pass: "Mithun123!!",
    },
  })
  
router.post('/signup', async (req, res) => {
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
  
  
  router.post('/update', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
  
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
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email,password)
  
      // Check if the user exists with the provided email
      const user = await User.findOne({ email });
      console.log(user)
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check if the provided password matches the user's password
      if (password != user.password) {
        return res.status(401).json({ message: 'Invalid password.' });
      }
  
      // Check user type and send appropriate response
      if (user.userType === 'admin') {
        // If user is admin, send 200 status
        return res.status(200).json({ message: 'Welcome, admin!', userType: 'admin' });
      } else {
        // If user is not admin, redirect to another page
        return res.status(200).json({ message: 'Redirect to user page', userType: 'user' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred during login.' });
    }
  });
  
  
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