const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Insert Mongo ID for User ID
const userSchema = new Schema(
  {
    __id: String,
    firstName: String,
    lastName: String,
    email: String,
    organization: String,
    password: String
  }
);

module.exports = mongoose.user('User', userSchema);