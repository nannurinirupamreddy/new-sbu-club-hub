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
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
