const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

async function protectRoute(req, res, next) {
  try {
    const token = req.cookies.jwt_token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided!" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Invalid token provided!" });
    }

    req.user = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      sbuId: user.sbuId,
    };
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

module.exports = protectRoute;
