const authController = require("./auth");
const categoryController = require("./category");
const fileController = require("./file");
// const fileS3Controller = require("./fileToS3")
const postController = require("./post")
const commentController = require("./comment")


module.exports = {
    authController, 
    categoryController,
    // fileS3Controller
    fileController,
    postController,
    commentController
    };