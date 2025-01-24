// routes/authRoutes.js
const express = require("express");
const {
  userSignup,
  sellerSignup,
  userLogin,
  sellerLogin,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/verifyToken");

const router = express.Router();

// User Routes
router.post("/user/signup", userSignup);
router.post("/user/login", userLogin);

// Seller Routes
router.post("/seller/signup", sellerSignup);
router.post("/seller/login", sellerLogin);

// Example protected route (optional, demonstrating verifyToken usage)
router.get("/protected", (req, res) => {
  res.status(200).send({ result: "Access granted", user: req.user });
});

module.exports = router;
