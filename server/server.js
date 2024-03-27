
let express = require('express'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser');
dotenv = require('dotenv')
nodemailer = require("nodemailer")
let User = require('./schema/User');

const app = express();
app.use(cors());

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const bcrypt = require('bcrypt');
const saltRounds = 10;



const PORT = process.env.PORT || 3000;
mongoose
  .connect('mongodb+srv://finalproject:finalproject@finalproject.xa5ol.mongodb.net/')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })

app.post('/signup', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, email, userType } = req.body;


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
      text: `Dear ${name},\n\nWelcome to YourApp! Your temporary password is: ${defaultPassword}\n\nPlease login to your account and change your password as soon as possible.\n\nBest regards,\nYourApp Team`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      userType: req.body.userType
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




app.post('/login', async (req, res) => {
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
// app.post('/login', async (req, res) => {
//   try {
//     const { email,password } = req.body;

//     // Check if the user exists with the provided email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }
//     const passwordMatch =  bcrypt.compare(password, user.password);

//   if (!passwordMatch) {
//     return res.status(401).json({ message: 'Invalid password.' });
//   }
//     // Check user type
//     if (user.userType === 'admin') {
//       // Redirect to admin route or send admin-specific response
//       return res.status(200).json({ message: 'Welcome, admin!' });
//     }

//     // For non-admin users, send a generic response
//     // return res.status(200).json({ message: 'Welcome, user!' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'An error occurred during login.' });
//   }
// });








app.listen(3000, () => console.log("server running"))