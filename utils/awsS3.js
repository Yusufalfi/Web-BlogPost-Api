// const {PutObjectCommand, S3Client} = require("@aws-sdk/client-s3");
// const {awsRegion,awsAccessKey, awsSecretKey, awsBucketName} = require("../config/kyes")
// const generateCode = require("../utils/generateCode")

// const client = new S3Client({
//     region: awsRegion,
//     credentials: {
//         accessKeyId: awsAccessKey,
//         secretAccessKey: awsSecretKey
//     }
// })

// const uploadFileToS3 = async ({file, ext}) => {
//     // random_number + ramdom_number + extension
//     const Key = `${generateCode(5)}_${Date.now()}${ext}`;
    
//     const params = {
//         Bucket: awsBucketName,
//         Body: file.buffer,
//         Key: Key,
//         ContentType : file.mimetype,
//     }

//     const command = new PutObjectCommand(params);

//     try {
//         await client.send(command);
//         return Key;
//     } catch (error) {
//         console.log(error)
//     }
    
// }

// module.exports = {uploadFileToS3}