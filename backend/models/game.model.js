const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  numberOfControllers: {
    type: Number,
    required: false,
    min: 1,
    default: 1,
  },
  controllersInUse: {
    type: Number,
    default: 0,
    min: 0,
  },
  studentWillingToShare: {
    type: Boolean,
    default: false,
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
