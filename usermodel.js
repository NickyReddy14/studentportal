const mongoose = require('mongoose')
const crypto = require('crypto')

const users = new mongoose.Schema({
    fullname :{
        type : String,
        required : true
    },
    collegeId :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    branch :{
        type : String,
        required : true
    },
    cgpa:{
        type: String,
        required: true
    },
    mobile :{
        type : String,
        required : true
    },
    resume: {
        type: String,
        required: true
    },
    github :String,
    linkedin :String,
    
    password :{
        type : String,
        required : true,
    },
    confirmpassword :{
        type : String,
        required : true,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

users.methods.getResetPassword =function(){
    //create a random 20chars token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //make that token a reset password token
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    //give that token a expire date
    this.resetPasswordExpire = Date.now()+ 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('users',users)




