const Outfit = require("../models/outfitModel");
const { uploadFile, getFileStream } = require("../s3bucket");

exports.uploadImg = async (req, res) => {
  const file = req.file;
  console.log(file);
  console.log("buffer:", file.buffer);
  if (!file || !file.buffer) {
    return res.status(400).send("No image file provided");
  }

  console.log("mimetype", file.mimetype);
  if (!file.mimetype.startsWith("image/")) {
    return res.status(400).send("File is not an image");
  }

  try {
    const result = await uploadFile(file);
    console.log(result);
    res.send({ imagePath: `/images/${result.Key}` });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send("Error uploading image");
  }

  try {
    const article = Outfit.create()
  } catch (error) {

  }
};

exports.images = (req, res) => {
  const key = req.params.key;
  console.log("Requested image key:", key);

  try {
    const readStream = getFileStream(key);
    readStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving image from S3:", error);
    res.status(500).send("Error retrieving image");
  }
};
