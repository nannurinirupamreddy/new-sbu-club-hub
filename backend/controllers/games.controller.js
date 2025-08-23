const Game = require("../models/game.model");

async function getGames(req, res) {
  try {
    const games = await Game.find({});

    return res.status(200).json(games);
  } catch (error) {
    console.log("Error in getting games", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

async function editGame(req, res) {
  try {
    const { _id, name, description, availability } = req.body;

    const game = await Game.findByIdAndUpdate(
      _id,
      {
        name: name,
        description: description,
        availability: availability,
      },
      { new: true }
    );

    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }

    return res.status(200).json(game);
  } catch (error) {
    console.log("Error in editing game", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

async function addGame(req, res) {
  try {
    const { name, description } = req.body;

    const game = new Game({
      name: name,
      description: description,
    });

    await game.save();

    return res.status(201).json(game);
  } catch (error) {
    console.log("Error in adding game", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

async function deleteGame(req, res) {
  try {
    const gameId = req.params.id;

    const game = await Game.findByIdAndDelete(gameId);

    return res.status(200).json(game);
  } catch (error) {
    console.log("Error in deleting game", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

module.exports.addGame = addGame;
module.exports.getGames = getGames;
module.exports.editGame = editGame;
module.exports.deleteGame = deleteGame;
