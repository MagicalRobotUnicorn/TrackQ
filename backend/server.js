const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

const mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const assetController = require('./routes/assetController');
const userController = require('./routes/userController');

app.use('/api/user/', userController);
app.use('/api/asset/', assetController);

const uri = 'mongodb://127.0.0.1:27017/';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database up...");
});

app.listen(PORT, () => {
  console.log('Server is listening on PORT ' + PORT);
});

// I am a comment