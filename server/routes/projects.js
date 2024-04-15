let express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

let projectSchema=require("../schema/Project")
const jswtUtils = require("../auth/auth_utils");

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Operations related to project management
 * /api/project:
 *   post:
 *     summary: Create a new project
 *     description: Endpoint to create a new project.
 *     tags:
 *       - Project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: ProjectData
 *         description: Project data to be submitted.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             projectName:
 *               type: string
 *               description: The name of the project.
 *             projectId:
 *               type: string
 *               description: The ID of the project.
 *             category:
 *               type: string
 *               description: The category of the project.
 *             startDate:
 *               type: string
 *               format: date
 *               description: The start date of the project.
 *             endDate:
 *               type: string
 *               format: date
 *               description: The end date of the project.
 *     responses:
 *       200:
 *         description: Project added successfully.
 *       400:
 *         description: Bad request, invalid input data.
 *       401:
 *         description: Unauthorized, JWT token missing or invalid.
 *       500:
 *         description: Internal server error, unable to create project.
 */

/**
 * @swagger
 * /api/project:
 *   get:
 *     summary: Get project IDs
 *     description: Endpoint to fetch project IDs.
 *     tags:
 *       - Project
 *     responses:
 *       200:
 *         description: Project IDs fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projectIds:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Project ID.
 *       500:
 *         description: Internal server error, unable to fetch project IDs.
 */
router.post('/project',jswtUtils.authenticateJWT, async (req, res) => {
    try {
      const { projectName, projectId, category, startDate, endDate} = req.body;
  
      // Check if the projectId already exists
      // const existingProject = await projectSchema.findOne({ projectId });
      // if (existingProject) {
      //   return res.status(400).json({ error: 'Project ID already exists' });
      // }
  
      // Create a new project in projectSchema collection
      const newProject = new projectSchema({ projectName:projectName, projectId:projectId, category:category, startDate:startDate, endDate:endDate });
      await newProject.save();
      
      res.status(200).json({ message: 'Project added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  router.get('/project', async (req, res) => {
    try {
      // Fetch all projects from the database
      const projects = await projectSchema.find({}, { projectId: 1 });
  
      // Extract project IDs from the projects array
      const projectIds = projects.map((project) => project.projectId);
  
      // Send the project IDs as JSON response
      res.json({ projectIds });
    } catch (error) {
      // Handle errors
      console.error('Error fetching project IDs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  module.exports=router