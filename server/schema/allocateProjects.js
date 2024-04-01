const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectAllocationSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    projectId: {
      type: String,
      required: true
    },
    allocation_start: {
      type: Date,
      required: true
    },
    allocation_end: {
      type: Date,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('AllocateProject', projectAllocationSchema)   