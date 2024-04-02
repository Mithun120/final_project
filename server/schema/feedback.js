const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({
    email:{ type: String, required: true },
    role:{ type: String, required: true },
    q1:{ type: String, required: true },
    q2:{ type: String, required: true },
    q3:{ type: String, required: true },
    q4:{ type: String, required: true },
    q5:{ type: String, required: true },
    q6:{ type: String, required: true },
    filled: { type: Boolean, default: false }
    
}, {
    collection: 'feedbacks',timestamps: true
})
module.exports = mongoose.model('Feedback', feedbackSchema)   