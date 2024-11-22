const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const { commentController } = require("../controllers");
const { addCommentValidator, updateCommentValidator, idValidator} = require("../validator/comment");

const validate = require("../validator/validate");


router.post("/:postId", isAuth, addCommentValidator,validate,commentController.addComment )
router.put("/:id", isAuth, updateCommentValidator, idValidator, validate, commentController.updateComment);
router.delete("/:id", isAuth, idValidator, validate, commentController.deleteComment);
router.get("/", isAuth, commentController.getComment)
// // router.get("/:id", isAuth, idValidator, validate, commentController.getCommentById);

module.exports = router;