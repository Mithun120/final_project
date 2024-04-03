const express = require('express');
const router = express.Router();
const utils=require("../auth/auth_utils")
const FeedbackControllers=require("../controller/feedbackController")
router.post('/CreateFeedback',utils.authenticateJWT,FeedbackControllers.CreateFeedbackEntry)
module.exports = router;