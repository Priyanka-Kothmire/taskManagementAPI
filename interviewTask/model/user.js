const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    login_status: {
        type: String
    },
    bearer_token:{
        type : String
    }

}, { timestamps: true });
module.exports = mongoose.model("users", userSchema)