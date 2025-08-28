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

async function getGameById(req, res) {
  try {
    const gameId = req.params.id;
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found!" });
    }
    return res.status(200).json(game);
  } catch (error) {
    console.log("Error in getting game by ID", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}

async function editGame(req, res) {
  try {
    const { id } = req.params;

    const { name, description, availability } = req.body;

    const game = await Game.findByIdAndUpdate(
      id,
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
    const { name, description, availability } = req.body;
    
    console.log('Received game data:', { name, description, availability });
    console.log('Full request body:', req.body);

    const game = new Game({
      name: name,
      description: description,
      availability: availability !== undefined ? availability : true,
    });

    console.log('Game object being saved:', game);

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
module.exports.getGameById = getGameById;
module.exports.getGames = getGames;
module.exports.editGame = editGame;
module.exports.deleteGame = deleteGame;
