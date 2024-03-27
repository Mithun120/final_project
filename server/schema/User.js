const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String
    },email:{
        type:String,
        required:true
    },
    userType:{
        type:String
    },
    password:{
        type:String
    }
}, {
    collection: 'users'
})
module.exports = mongoose.model('User', userSchema)