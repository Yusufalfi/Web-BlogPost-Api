const path = require("path")
const {validateExtension} =  require("../validator/file");
const { File } = require("../models");
const fs = require("fs")

const uploadFile = async (req,res,next) => {
    try {

        const {file} = req;
        console.log("files" + " " + file);
        if(!file) {
            res.code = 400;
            throw new Error("File is Not Selected")

        }

        const ext = path.extname(file.originalname);

        const isValidateExt =  validateExtension(ext);
        if(!isValidateExt) {
            res.code = 400;
            throw new Error("Extension file not allowed!");
        }
        const fileUrl = path.join('uploads', req.file.filename);
        const fullFileUrl = `http://localhost:8000/${fileUrl}`

        const newFile = new File({
            // key: fullFileUrl,
            key: fileUrl,
            size: file.size,
            mimetype: file.mimetype,
            createdBy: req.user._id 
        });
        // Save to database
        await newFile.save();

        res.status(201).json({
            code: 201,
            status: true,
            message: "File uploaded successfully",
            data : {
            //    file
               file: {
                originalname: req.file.originalname,
                filename: req.file.filename,
                fileUrl: fullFileUrl
             }
            }       
        })

     
    } catch (error) {
        next(error)
    }
}

const updateFile = async (req,res,next) => {
    try {
        const {id} = req.params;
        const {_id} = req.user;
        const {file} = req;
        console.log("files" + " " + file.filename)


        const images = await File.findById(id)
        console.log("console" + " " +images)
        if(!images) {
            res.code = 404;
            throw new Error("Image not found")
        }
            // path file image old
        const oldPathImage = path.join(__dirname, '../' , images.key);
        console.log("oldPathImage" + " " + oldPathImage)

         //del file old
        fs.unlink(oldPathImage, (err) => {
            if(err) {
                console.error("Eror delete file old" +err);
            }
         })
        //  path upload file
        const fileUrl = path.join('uploads', file.filename);
        console.log("fileUrl" + " " + fileUrl);

        images.key = fileUrl;
        images.mimetype= file.mimetype,
        images.size= file.size,
        images.updatedBy = _id;
        await images.save();

         res.status(200).json({
            code: 200,
            status: true,
            message: "Update Image Successfully",
            data : {
              images
            }
        })

    } catch (error) {
        next(error)
    }
}

const deleteFile = async (req,res,next) => {
    try {
        const {id} = req.params;

        const images = await File.findById(id)
        if(!images) {
            res.code = 404;
            throw new Error("Image not found")
        }

        // console.log("FilePath", images.key)
        // console.log("dir_Name", __dirname)

        // join path current folder, exit one folder controller -> to folder uploads / folder file tersimpan 
        const imagePath = path.join(__dirname, '../' , images.key)
        console.log(imagePath)
        // remove Image
        const unlinkImage = fs.unlink(imagePath, err => console.log(err) );

        await File.findByIdAndDelete(id);
        res.status(201).json({
            code: 201,
            status: true,
            message: "File deleted successfully"
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {uploadFile, deleteFile, updateFile}