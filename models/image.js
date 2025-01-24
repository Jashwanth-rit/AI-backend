const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String
  },
  uploadedAt: { type: Date, default: Date.now }
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
