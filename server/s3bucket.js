require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");
const crypto = require("crypto");
const sharp = require("sharp");

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// Uploads a file to s3
async function uploadFile(file) {
  try {
    const buffer = await sharp(file.buffer)
      .resize({ height: 100, width: 100, fit: "contain" })
      .toBuffer();

    const uploadParams = {
      Bucket: bucketName,
      Body: buffer,
      Key: randomImageName(),
      ContentType: file.mimetype,
    };

    return s3.upload(uploadParams).promise();
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}

// Downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

module.exports = { uploadFile, getFileStream };
