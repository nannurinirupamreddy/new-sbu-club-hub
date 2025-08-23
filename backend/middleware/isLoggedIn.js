const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

async function isLoggedIn(req, res, next) {
  try {
    const token = req.cookies.jwt_token;

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);

      if (decoded) {
        const loggedInUser = await User.findById(decoded._id);
        req.user = {
          _id: decoded._id,
          email: decoded.email,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          sbuId: decoded.sbuId,
        };
        return res.status(400).json({ message: "Already Logged In!" });
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    console.log("Error in verifyLogin middleware", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

module.exports = isLoggedIn;
