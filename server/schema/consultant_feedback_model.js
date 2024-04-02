const mongoose = require('mongoose');
 
// Define schema for ConsultantFeedback
const consultantFeedbackSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  projectQuality: {
    type: Number,
    required: true
  },
  communication: {
    type: Number,
    required: true
  },
  problemSolving: {
    type: Number,
    required: true
  },
  responsiveness: {
    type: Number,
    required: true
  },
  professionalism: {
    type: Number,
    required: true
  },
  collaboration: {
    type: Number,
    required: true
  },
  overallSatisfaction: {
    type: Number,
    required: true
  },
  suggestions: {
    type: String
  }
});
 
// Create model from schema
const ConsultantFeedback = mongoose.model('ConsultantFeedback', consultantFeedbackSchema);
 
module.exports = ConsultantFeedback;