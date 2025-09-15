const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

async function isAdminOrAtt(req, res, next) {
  try {
    const user = req.user;

    if (!user.admin && !user.attendant) {
      return res.status(401).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    console.log("Error in checking admin or attendant", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

module.exports = isAdminOrAtt;
