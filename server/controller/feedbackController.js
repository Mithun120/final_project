const feedbackModel=require("../schema/feedback")
const CreateFeedbackEntry = async (req, res) => {

  try {

      const email = req.user.email;
      const role = req.user.role;
      const { projectId, start_period, end_period, feedback } = req.body;

  // console.log("oo",req.body)

      const feedbackDataFilled = await feedbackModel.findOne({
        email: email,
        start_period,
        end_period,
      });

      if (!feedbackDataFilled) {
        // No feedback found, send a response indicating no feedback
        const newFeedback = new feedbackModel({
          email: email,
          projectId: projectId,
          role: role,
          start_period: start_period, // Example start date
          end_period: end_period, // Example end date
          q1: feedback['q1'],
          q2: feedback['q2'],
          q3: feedback['q3'],
          q4: feedback['q4'],
          q5: feedback['q5'],
          q6: feedback['q6'],
          comments: feedback['comments'],
          created_at: new Date()
      });

      
          const result = await newFeedback.save();
          console.log("result daa",result);
          return res.json({ message: "Feedback data saved" });
      
      }
      // Feedback found, send a success message
      return res
        .status(200)
        .json({ message: "Feedback already submitted for this week." });
    } 

     catch (error) {
      console.log(error);
      res.json({ "message": "unable to create feedback entry" })
    }
  }
module.exports = {
  CreateFeedbackEntry
}