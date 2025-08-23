const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

async function isAdmin(req, res, next) {
  try {
    const user = req.user;

    if (!user.admin) {
      return res.status(401).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    console.log("Error in checking admin", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

module.exports = isAdmin;
