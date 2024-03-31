const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String
    },email:{
        type:String,
        required:true,
        unique:true
    },
    userType:{
        type:String
    },
    role:{
        type:String
    },
    password:{
        type:String
    },
    otp:{
        type:Number
    }
}, {
    collection: 'users',timestamps: true
})
module.exports = mongoose.model('User', userSchema)