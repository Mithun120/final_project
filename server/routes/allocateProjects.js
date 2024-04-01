const express = require('express');
const router = express.Router();
const jswtUtils = require("../auth/auth_utils");
const projectAllocationSchema = require("../schema/allocateProjects");
const formatDateToISO = (dateString) => {
    const [day, month, year] = dateString.split('/');
    const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00.000Z`;
    return isoDate;
  };
router.post('/projectallocation', jswtUtils.authenticateJWT, async (req, res) => {
    try {   
        const { projectId, email, allocation_start, allocation_end } = req.body;
        console.log(req.body);

        console.log(req.user)

        // Check if the user is authenticated with a valid token and is an admin
        if (req.user && req.user.role === "admin") {
            const newProj = new projectAllocationSchema({
                projectId: projectId,
                email: email,
                allocation_start: allocation_start,
                allocation_end: allocation_end,
                created_at: new Date()
            });
                
            try {
                const result = await newProj.save();
                console.log(result);
                res.json({ message: "Project allocated" });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Error creating project", message: error.message });
            }
        } else {
            res.status(403).json({ message: "Only admins with valid JWT can perform this function" });
        }
    } catch (err) {
        console.error('Error creating project', err);
        res.status(500).json({ message: "Error creating project" });
    }
});

module.exports = router;
