const mongoose = require('mongoose');
const technologySchema = new mongoose.Schema({
    taskName : {
        type: String
    },
    status: {
        type: String
    },
    description:{
        type: String
    }

}, { timestamps: true });
module.exports = mongoose.model("technology", technologySchema)