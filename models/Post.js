const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {type:String, required: true},
    desc: String,
    file: {type: mongoose.Types.ObjectId, ref: "file"},
    category: {
        type: mongoose.Types.ObjectId, 
        ref: "category",
        required: true
    },
    updatedBy : {
        type: mongoose.Types.ObjectId, 
        ref: "user",
        required: true,
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment',  // Referensi ke model Comment
       }],
    // comment:{
    //       type: mongoose.Types.ObjectId, 
    //       ref: "comment"
    // }
}, {timestamps: true});

const Post = mongoose.model("post", postSchema)
module.exports = Post;