const {check, param} = require("express-validator");
const mongoose = require("mongoose");

const addCommentValidator = [
    check("text").notEmpty().withMessage("comment is required"),

    check("file").custom(async(file) => {
        if(file && !mongoose.Types.ObjectId.isValid(file)) {
          throw "Invalid File Id "
        }
    }),

    // check("post").notEmpty().withMessage("Post is Required").custom(async(post) => {
    //     if(post && !mongoose.Types.ObjectId.isValid(post)) {
    //       throw "Invalid Post Id"
    //     }
    // }),
]

const updateCommentValidator = [
     check("file").custom(async(file) => {
        if(file && !mongoose.Types.ObjectId.isValid(file)) {
          throw "Invalid File Id "
        }
    }),

  
    check("post").notEmpty().withMessage("Post is Required").custom(async(post) => {
        if(post && !mongoose.Types.ObjectId.isValid(post)) {
          throw "Invalid Post Id"
        }
    }),
]

const idValidator = [
  param("id").custom(async(id) => {
    if(id && !mongoose.Types.ObjectId.isValid(id)) {
      throw "Invalid Comment Id"
    }
  })
]

module.exports = {addCommentValidator, updateCommentValidator, idValidator}
// module.exports = {addCommentValidator}