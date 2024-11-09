const multer = require('multer');


// upload file to folder uploads and filter upload file
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 50 // 50MB
    }

    })

module.exports = upload;