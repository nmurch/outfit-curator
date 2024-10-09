const mongoose = require("mongoose");

const ClothingItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    name: { type: String, required: true }, // e.g. red t-shirt
    type: { type: String, required: true }, // e.g. t-shirt
    color: { type: String, required: true }, // e.g. red
    size: { type: String },
    imageUrl: { type: String }, // links to image in s3
    tags: [{ type: String }] // e.g. ["casual", "summer"]
});

module.exports = mongoose.model("Items", ClothingItemSchema);