const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    projectName: String,
  projectId:   String, // Make projectId unique
  category: String,
  startDate: String,
  endDate: String,
}, {
    collection: 'projects',timestamps: true
})
module.exports = mongoose.model('Project', projectSchema)   

