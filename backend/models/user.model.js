const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  sbuId: {
    type: Number,
    // Stony Brook IDs are exactly 9 digits. minlength/maxlength only apply to
    // strings, so a 9-digit number is enforced with a numeric range instead.
    min: [100000000, "SBU ID must be 9 digits"],
    max: [999999999, "SBU ID must be 9 digits"],
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  attendant: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
