const express = require('express'); 
const router = express.Router();
const authUtils = require("../auth/auth_utils");
const TimesheetControllers = require("../controller/timesheetController");

router.post('/getTimesheetData', authUtils.authenticateJWT, TimesheetControllers.RertreiveTimesheetPerWeek);
router.get('/getUserProject', authUtils.authenticateJWT, TimesheetControllers.RetreiveUserProject);
router.post('/CreateUpdateTimesheets', authUtils.authenticateJWT, TimesheetControllers.CreateUpdateTimesheets);

module.exports = router;

   