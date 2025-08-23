const express = require("express");
const {
  signup,
  login,
  logout,
  checkAuth,
} = require("../controllers/auth.controller");
const isLoggedIn = require("../middleware/isLoggedIn");
const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.post("/signup", isLoggedIn, signup);
router.post("/login", isLoggedIn, login);
router.post("/logout", protectRoute, logout);
router.get("/check-auth", protectRoute, checkAuth);

module.exports = router;
