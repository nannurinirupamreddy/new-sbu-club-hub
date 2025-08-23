const express = require("express");
const {
  getGames,
  addGame,
  editGame,
  deleteGame,
} = require("../controllers/games.controller");
const protectRoute = require("../middleware/protectRoute");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.post("/", addGame);
router.get("/", protectRoute, getGames);
router.put("/:id", protectRoute, isAdmin, editGame);
router.delete("/:id", protectRoute, isAdmin, deleteGame);

module.exports = router;
