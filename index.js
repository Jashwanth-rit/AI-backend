const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
app.use(bodyParser.json());


app.use(cors({
  origin: process.env.FRONTEND_URL,
}));
const port = process.env.PORT || 6600;

// Connect to MongoDB

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));






app.listen(port, () => {
  console.log("Server is running on port 3000");
});
