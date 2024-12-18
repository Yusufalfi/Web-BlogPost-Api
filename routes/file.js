const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const {fileController} = require("../controllers");
const upload = require("../middlewares/upload")


// single upload file 

router.post("/upload", isAuth, upload.single("image"), fileController.uploadFile)

// upload multple 3 File (max)
// router.post("/upload", isAuth, upload.array("image", 3), fileController.uploadFile)

// update file
router.put("/:id",isAuth, upload.single("image"), fileController.updateFile)

router.delete("/:id", isAuth, fileController.deleteFile)



module.exports = router;