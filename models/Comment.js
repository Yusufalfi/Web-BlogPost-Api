const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    text: {type:String, required: true},
    file: {type: mongoose.Types.ObjectId, ref: "file"},
    post: {
        type: mongoose.Types.ObjectId, 
        ref: "post",
        required: true
    },
    updatedBy : {
        type: mongoose.Types.ObjectId, 
        ref: "user",
        required: true,
    }
}, {timestamps: true});

const Comment = mongoose.model("comment", commentSchema)
module.exports = Comment;