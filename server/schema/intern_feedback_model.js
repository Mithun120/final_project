const mongoose = require('mongoose');
 
const internFeedbackSchema = new mongoose.Schema({
  userName:String,
  guidance: Number,
  tasks: Number,
  communication: Number,
  support: Number,
  contribution: Number,
  feedbackProcess: Number,
  application: Number,
  learningExperience: Number,
  improvements: String
});
 
const InternFeedback = mongoose.model('InternFeedback', internFeedbackSchema);
 
module.exports = InternFeedback;