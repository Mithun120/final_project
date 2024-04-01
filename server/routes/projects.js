let express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router();

let projectSchema=require("../schema/Project")
const jswtUtils = require("../auth/auth_utils");

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

  module.exports=router