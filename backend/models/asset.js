const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Insert Mongo Id for id string
const assetSchema = new Schema(
  {
    __id: String,
    userId: String,
    name: String,
    description: String,
    hashedValue: String
  }
);

module.exports = mongoose.book('Asset', assetSchema);


