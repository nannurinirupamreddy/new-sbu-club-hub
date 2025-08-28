const User = require("../models/user.model");
const { hashPassword, verifyPassword } = require("../utils/password");
const generateToken = require("../utils/token");

async function signup(req, res) {
  const { firstName, lastName, sbuId, email, password } = req.body;

  try {
    const ifUserExists = await User.findOne({ email: email });

    if (ifUserExists)
      return res.status(400).json({ message: "Account already exists!" });

    const hashedPass = await hashPassword(password);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      sbuId: sbuId,
      email: email,
      password: hashedPass,
    });

    await user.save();

    generateToken(user._id, user.role, res);

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      sbuId: user.sbuId,
      email: user.email,
      admin: user.admin,
    });
  } catch (error) {
    console.log("Error in signup route", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const passwordMatched = await verifyPassword(password, user.password);

    if (passwordMatched) {
      generateToken(user._id, user.role, res);
      return res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        sbuId: user.sbuId,
        email: user.email,
        admin: user.admin,
      });
    } else {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }
  } catch (error) {
    console.log("Error in login route", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("jwt_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({ message: "Logged out succesfully!" });
  } catch (error) {
    console.log("Error in logout route", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

async function checkAuth(req, res) {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth", error);
    return res.status(500).json({ messaage: "Internal Server Error!" });
  }
}

module.exports.signup = signup;
module.exports.login = login;
module.exports.logout = logout;
module.exports.checkAuth = checkAuth;
