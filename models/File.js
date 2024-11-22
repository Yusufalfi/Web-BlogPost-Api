
const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    key: {type:String, required: true},
    size: Number,
    mimetype: String,
    createdBy: {type: mongoose.Types.ObjectId, ref:"user"} //relation to user
}, {timestamps: true});

const File = mongoose.model("file", fileSchema);
module.exports = File;
