const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../auth/auth_utils'); // Assuming you have an authentication utility

// Import necessary models and utilities
const { timesheetSchema } = require('../schema/timesheet');
const { projectAllocationSchema}=require("../schema/allocateProjects")
const { ConvertTimesheetFormat, RetreiveProjectName } = require('../auth/timesheet_utils');

// Define the route handlers directly in the routes file
router.post('/getTimesheetData', authenticateJWT, async (req, res) => {
  try {
    const user = req.user.email;
    const { startPeriod, endPeriod } = req.body;
    const timeSheetdata = await timesheetSchema.find({
      email: user,
      start_period: startPeriod,
      end_period: endPeriod,
      visible: true
    });

    if (timeSheetdata.length !== 0) {
      res.json({ message: "Timesheet data sent", payload: ConvertTimesheetFormat(timeSheetdata) });
    } else {
      const newTimeSheet = new timesheetSchema({
        UID: Math.floor(100000 + Math.random() * 900000).toString(),
        email: user,
        projectId: "", // Assuming projectId is empty initially
        activity: "",
        comments: "",
        start_period: startPeriod,
        end_period: endPeriod,
        mon: 0,
        tue: 0,
        wed: 0,
        thur: 0,
        fri: 0,
        sat: 0,
        sun: 0,
        created_at: new Date()
      });

      const result = await newTimeSheet.save();
      console.log(result);
      res.json({ message: "Timesheet data sent", payload: ConvertTimesheetFormat([result]) });
    }
  } catch (error) {
    console.log(error);
    res.json({ "message": "Unable to retrieve timesheet data" });
  }
});

router.get('/getUserProject', authenticateJWT, async (req, res) => {
  try {
    const userproject = await projectAllocationSchema.find({
      email: req.user.email
    });

    if (userproject.length !== 0) {
      res.json({ message: "Project sent", payload: await RetreiveProjectName(userproject) });
    } else {
      res.json({ message: "Project sent", payload: [{ projectId: "0", name: "bench" }] });
    }
  } catch (error) {
    console.log(error);
    res.json({ "message": "Unable to retrieve project data" });
  }
});

router.post('/CreateUpdateTimesheets', authenticateJWT, async (req, res) => {
  try {
    const data = req.body;

    for (const [key, value] of Object.entries(data)) {
      const existingTimesheet = await timesheetSchema.findOne({
        UID: value.UID,
        email: value.email,
        start_period: value.start_period,
        end_period: value.end_period
      });

      if (existingTimesheet) {
        await timesheetSchema.updateOne({
          UID: value.UID,
          email: value.email,
          start_period: value.start_period,
          end_period: value.end_period
        }, {
          $set: value
        });
        console.log(`Timesheet entry updated for UID ${value.UID}`);
      } else {
        // If the timesheet entry doesn't exist, create a new one
        const newTimesheet = new timesheetSchema(value);
        await newTimesheet.save();
        console.log(`New timesheet entry created for UID ${value.UID}`);
      }
    }

    res.status(200).json({ message: "Timesheets created/updated successfully" });
  } catch (error) {
    console.error('Error creating/updating timesheets:', error);
    res.status(500).json({ message: 'Error creating/updating timesheets' });
  }
});

module.exports = router;
