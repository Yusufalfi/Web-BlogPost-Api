const multer = require('multer');
const path = require("path");
const generateCode = require('../utils/generateCode');




const storage = multer.diskStorage({
    destination: (req,file,callback)=> {
        callback(null,'./uploads')
    },
     filename: (req, file, cb) => {
        // console.log(file)
        // originalfilename + 12digitRandom + extension
        const originalName =  file.originalname
        const extension = path.extname(originalName);
        const filename = originalName.replace(extension, "");
        const compresFileName = filename.split(" ").join("_");
        const lowerCaseFileName = compresFileName.toLocaleLowerCase();
        const code = generateCode(12);
        const finalFile = `${lowerCaseFileName}_${code}${extension}`;
        console.log(finalFile);
        cb(null,finalFile);

    }
})

// upload file to folder uploads and filter upload file
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(file)
        const mimetype = file.mimetype;
        if(mimetype === "image/jpg" || mimetype === "image/jpeg" ||mimetype === "image/png" || mimetype === "aplication/pdf") {
            cb(null, true);
        } else{
            cb(new Error("File Extension not allowed !"))
        }
        
    }
   
    })

module.exports = upload;