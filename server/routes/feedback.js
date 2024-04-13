const express = require('express');
const router = express.Router();
const utils=require("../auth/auth_utils")
const FeedbackControllers=require("../controller/feedbackController")
const user=require("../schema/User")
const cron = require('node-cron');
const timesheetModel=require('../schema/timesheet')
const feedbackModel=require('../schema/feedback')
router.post('/CreateFeedback',utils.authenticateJWT,FeedbackControllers.CreateFeedbackEntry)

cron.schedule("0 10 * * 5", async () => {
    // Get the start and end date for the current week (assuming the week starts on Sunday)
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - startDate.getDay()); // Set to Sunday of current week
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Set to Saturday of current week
   
    // Find all users
    const users = await user.find();
   
    // Loop through each user
    for (const user of users) {
      // Check if the user has a corresponding timesheet entry for the current week
      const timesheet = await timesheetModel.findOne({
        email: user.email,
        start_period: { $lte: endDate },
        end_period: { $gte: startDate },
      });
   
      // If there's no timesheet entry or if the flag is false, trigger the email notification
      if (!timesheet) {
        // Send email notification to the user
        transporter.sendMail(
          {
            from: "mithunm.20cse@kongu.edu",
            to: user.email,
            subject: "Reminder: Submit your timesheet & feedback",
            text: "This is a reminder to submit your timesheet & feedback for the current week.",
          },
          (err, info) => {
            if (err) {
              console.error("Error sending email:", err);
            } else {
              console.log("Email sent:", info.response);
            }
          }
        );
      } else if (!timesheet.flag) {
        transporter.sendMail(
          {
            from: "mithunm.20cse@kongu.edu",
            to: "user.email",
            subject: "Reminder: Submit your feedback",
            text: "This is a reminder to submit your feedback for the current week.",
          },
          (err, info) => {
            if (err) {
              console.error("Error sending email:", err);
            } else {
              console.log("Email sent:", info.response);
            }
          }
        );
      }
    }
  });
module.exports = router;