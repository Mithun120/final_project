const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timesheetSchema = new Schema({
    UID:{
      type: String,
      unique: true,
      required:true
    },
    email: {
      type: String,
      required: true
    },
    projectId: {
      type: String
    },
    activity: {
      type: String
    },
    comments:{
      type: String
    },
    start_period: {
      type: Date,
      required: true
    },
    end_period: {
      type: Date,
      required: true
    },
    mon: {
      type: Number,
      required: true
    },
    tue: {
      type: Number,
      required: true
    },
    wed: {
      type: Number,
      required: true
    },
    thur: {
      type: Number,
      required: true
    },
    fri: {
      type: Number,
      required: true
    },
    sat: {
      type: Number,
      required: true
    },
    sun: {
      type: Number,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    visible:{
      type:Boolean,
      default:true
    },
    flag:{
      type:Boolean,
      default:false
    }
  });
  
module.exports = mongoose.model('timesheet', timesheetSchema)  
