const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

async function generateToken(id, role, res) {
  const token = jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax", // Changed from "none" to "lax" for better mobile support
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

module.exports = generateToken;
