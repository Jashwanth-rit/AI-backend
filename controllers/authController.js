// controllers/authController.js
const User = require('../models/user');
const Seller = require('../models/seller');
const jwt = require('jsonwebtoken');

// User Signup
exports.signupUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error("Error signing up user", error);
    res.status(400).send({ error: "Error signing up user" });
  }
};

// Seller Signup
exports.signupSeller = async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.status(201).send(seller);
  } catch (error) {
    console.error("Error signing up seller", error);
    res.status(400).send({ error: "Error signing up seller" });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).send({ result: "Invalid email or password" });
    }

    // Generate JWT token
    jwt.sign(
      { user },
      process.env.JWT_USER_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION },
      (err, token) => {
        if (err) {
          return res.status(500).send({ result: "Failed to generate token" });
        }
        res.status(200).send({ user, auth: token });
      }
    );
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(400).send({ result: "Error logging in user" });
  }
};

// Seller Login
exports.loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email, password });
    if (!seller) {
      return res.status(404).send({ result: "Invalid email or password" });
    }

    // Generate JWT token
    jwt.sign(
      { seller },
      process.env.JWT_SELLER_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION },
      (err, token) => {
        if (err) {
          return res.status(500).send({ result: "Failed to generate token" });
        }
        res.status(200).send({ seller, auth: token });
      }
    );
  } catch (error) {
    console.error("Error logging in seller", error);
    res.status(400).send({ result: "Error logging in seller" });
  }
};


