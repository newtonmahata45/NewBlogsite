const aws = require("aws-sdk");
require("dotenv").config();
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

aws.config.update({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey:  process.env.SECRETACCESSKEY,
    region: "ap-south-1"
})
let uploadFile = async (file) => {
    try {
        console.log("aws")
        return new Promise(function (resolve, reject) {
            let s3 = new aws.S3({ apiVersion: "2006-03-01" })
            var uploadParams = {
                ACL: "public-read",
                Bucket: "classroom-training-bucket",
                Key: "ecart/" + file.originalname,
                Body: file.buffer
            }
            s3.upload(uploadParams, function (err, data) {
                if (err) {
                    console.log("can't upload file")
                    return reject({ "error": err })
                }
                return resolve(data.Location)
            })
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error.message })
    }
}
module.exports.uploadFile = uploadFile