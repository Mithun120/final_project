const express = require('express');
const FeedbackController = require('../controller/feedbackController');
const router = express.Router();
 
router.post('/intern', FeedbackController.interncreateFeedback);
router.post('/general', FeedbackController.generalcreateFeedback);
router.post('/consultant',FeedbackController.consultantcreateFeedback);
router.post('/tribemaster',FeedbackController.tribemastercreateFeedback);
module.exports = router; 