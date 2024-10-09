const mongoose = require("mongoose");

const OutfitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }, // e.g. going out night outfit
  clothingItems: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageUrl: { type: String }, // links to image in s3
  tags: [{ type: String }], // e.g. ["work", "office", "formal"]
});



module.exports = mongoose.model("Outfit", OutfitSchema);
