
const path = require("path")
const {validateExtension} =  require("../validator/file");
const {uploadFileToS3} = require("../utils/awsS3")

const uploadFile = async (req, res, next) => {
    try {
        const {file} = req;
        // console.log(file);
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

        const key = await uploadFileToS3({file, ext})

        res.status(201).json({
            code: 201,
            status: true,
            message: "File uploaded successfully",
            data : {
               key
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {uploadFile} ;