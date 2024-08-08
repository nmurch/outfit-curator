const mongoose = require("mongoose");

const outfitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "ClothingItem" }],
});

const Outfit = mongoose.model("Outfit", outfitSchema);

module.exports = Outfit;
