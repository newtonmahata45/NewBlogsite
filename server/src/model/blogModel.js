const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const blogSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    blogFile: String,
    description: { 
        type: String, 
        required: true 
    },
    userId: { 
        type: ObjectId, 
        required: true, 
        ref: "User" 
    }

}, { timestamps: true })


module.exports = mongoose.model('blogs', blogSchema)