const express = require('express'); 
const router = express.Router();
const authUtils = require("../auth/auth_utils");
const TimesheetControllers = require("../controller/timesheetController");
/**
 * @swagger
 * tags:
 *   name: Timesheets
 *   description: Operations related to timesheets
 */

/**
 * @swagger
 * /api/timesheets/retrieve:
 *   post:
 *     summary: Retrieve timesheet data per week
 *     description: Endpoint to retrieve timesheet data for a specified week.
 *     tags:
 *       - Timesheets
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startPeriod:
 *                 type: string
 *                 format: date
 *                 description: The start date of the week.
 *               endPeriod:
 *                 type: string
 *                 format: date
 *                 description: The end date of the week.
 *     responses:
 *       200:
 *         description: Timesheet data sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Timesheet'
 *       500:
 *         description: Internal server error, unable to retrieve timesheet data.
 */

/**
 * @swagger
 * /api/projects/retrieve:
 *   get:
 *     summary: Retrieve user projects
 *     description: Endpoint to retrieve projects associated with the user.
 *     tags:
 *       - Timesheets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project data sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       500:
 *         description: Internal server error, unable to retrieve project data.
 */

/**
 * @swagger
 * /api/timesheets/update:
 *   post:
 *     summary: Create or update timesheets
 *     description: Endpoint to create or update timesheets based on input data.
 *     tags:
 *       - Timesheets
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Timesheet'
 *     responses:
 *       200:
 *         description: Timesheets created/updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       500:
 *         description: Internal server error, unable to create/update timesheets.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Timesheet:
 *       type: object
 *       properties:
 *         UID:
 *           type: string
 *           description: Unique identifier for the timesheet.
 *         email:
 *           type: string
 *           description: User's email associated with the timesheet.
 *         projectId:
 *           type: string
 *           description: ID of the project associated with the timesheet.
 *         activity:
 *           type: string
 *           description: Activity description for the timesheet.
 *         comments:
 *           type: string
 *           description: Additional comments for the timesheet.
 *         start_period:
 *           type: string
 *           format: date
 *           description: Start date of the timesheet period.
 *         end_period:
 *           type: string
 *           format: date
 *           description: End date of the timesheet period.
 *         mon:
 *           type: integer
 *           description: Hours worked on Monday.
 *         tue:
 *           type: integer
 *           description: Hours worked on Tuesday.
 *         wed:
 *           type: integer
 *           description: Hours worked on Wednesday.
 *         thur:
 *           type: integer
 *           description: Hours worked on Thursday.
 *         fri:
 *           type: integer
 *           description: Hours worked on Friday.
 *         sat:
 *           type: integer
 *           description: Hours worked on Saturday.
 *         sun:
 *           type: integer
 *           description: Hours worked on Sunday.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date and time when the timesheet was created.
 *     Project:
 *       type: object
 *       properties:
 *         projectId:
 *           type: string
 *           description: ID of the project.
 *         name:
 *           type: string
 *           description: Name of the project.
 */


router.post('/getTimesheetData', authUtils.authenticateJWT, TimesheetControllers.RertreiveTimesheetPerWeek);
router.get('/getUserProject', authUtils.authenticateJWT, TimesheetControllers.RetreiveUserProject);
router.post('/CreateUpdateTimesheets', authUtils.authenticateJWT, TimesheetControllers.CreateUpdateTimesheets);

module.exports = router;

   