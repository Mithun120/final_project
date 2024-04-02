const InternFeedback = require('../schema/intern_feedback_model');
const generalFeedback = require('../schema/general_feedback_model');
const consultantFeedback = require('../schema/consultant_feedback_model');
const tribemasterFeedback = require('../schema/tribemaster_feedback_model');
 
const feedbackController = {};
 
feedbackController.interncreateFeedback = async (req, res) => {
    try {
        // Assuming the feedback model has fields similar to the ones in the frontend
        const { userName,guidance, tasks, communication, support, contribution, feedbackProcess, application, learningExperience, improvements } = req.body;
       
        // Create a new feedback instance
        const feedback = new InternFeedback({
          userName,
          guidance,
          tasks,
          communication,
          support,
          contribution,
          feedbackProcess,
          application,
          learningExperience,
          improvements
        });
   
        // Save the feedback to the database
        await feedback.save();
   
        // Respond with success message
        res.status(201).json({ success: true, message: 'Feedback added successfully' });
      } catch (error) {
        // If an error occurs, log it and respond with an error message
        console.error('Error adding feedback:', error);
        res.status(500).json({ success: false, message: 'Error adding feedback' });
      }
};
 
feedbackController.generalcreateFeedback = async (req, res) => {
  try {
    const {
      userName,
      satisfaction,
      communication,
      goals,
      deliverables,
      timeliness,
      challenges,
      projectManagement,
      support,
      improvements
    } = req.body;
 
    const feedback = new generalFeedback({
      userName,
      satisfaction,
      communication,
      goals,
      deliverables,
      timeliness,
      challenges,
      projectManagement,
      support,
      improvements
    });
 
    await feedback.save();
 
    res.status(201).json({ success: true, message: 'Feedback added successfully' });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ success: false, message: 'Error adding feedback' });
  }
};
 
// Controller function to add consultant feedback
feedbackController.consultantcreateFeedback = async (req, res) => {
  try {
    // Extract feedback data from request body
    const {userName, projectQuality, communication, problemSolving, responsiveness, professionalism, collaboration, overallSatisfaction, suggestions } = req.body;
 
    // Create a new instance of ConsultantFeedback model
    const feedback = new consultantFeedback({
      userName,
      projectQuality,
      communication,
      problemSolving,
      responsiveness,
      professionalism,
      collaboration,
      overallSatisfaction,
      suggestions
    });
 
    // Save feedback to the database
    await feedback.save();
 
    // Respond with success message
    res.status(201).json({ success: true, message: 'Consultant feedback submitted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error submitting consultant feedback:', error);
    res.status(500).json({ success: false, message: 'Error submitting consultant feedback' });
  }
};
 
feedbackController.tribemastercreateFeedback = async (req, res) => {
    try {
      const { userName,leadership, communication, decisionMaking, teamManagement, problemSolving, collaboration, overallPerformance } = req.body;
      const feedback = new tribemasterFeedback({ userName,leadership, communication, decisionMaking, teamManagement, problemSolving, collaboration, overallPerformance });
      await feedback.save();
      res.status(201).json({ success: true, message: 'Feedback added successfully' });
    } catch (error) {
      console.error('Error adding feedback:', error);
      res.status(500).json({ success: false, message: 'Error adding feedback' });
    }
  };
 
module.exports = feedbackController;
 