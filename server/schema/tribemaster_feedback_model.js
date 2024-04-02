 
const mongoose = require('mongoose');
 
// Define schema for TribeMasterFeedback
const tribeMasterFeedbackSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  leadership: {
    type: Number,
    required: true
  },
  communication: {
    type: Number,
    required: true
  },
  decisionMaking: {
    type: Number,
    required: true
  },
  teamManagement: {
    type: Number,
    required: true
  },
  problemSolving: {
    type: Number,
    required: true
  },
  collaboration: {
    type: Number,
    required: true
  },
  overallPerformance: {
    type: Number,
    required: true
  }
});
 
// Create model from schema
const TribeMasterFeedback = mongoose.model('TribeMasterFeedback', tribeMasterFeedbackSchema);
 
module.exports = TribeMasterFeedback;