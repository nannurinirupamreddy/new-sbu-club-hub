const express = require("express");
const {
  getGames,
  addGame,
  editGame,
  deleteGame,
  getGameById,
} = require("../controllers/games.controller");
const protectRoute = require("../middleware/protectRoute");
const isAdmin = require("../middleware/isAdmin");
const isAdminOrAtt = require("../middleware/isAdminOrAtt");

const router = express.Router();

router.post("/", addGame);
router.get("/", protectRoute, getGames);
router.get("/:id", protectRoute, isAdmin, getGameById);
router.put("/:id", protectRoute, isAdminOrAtt, editGame);
router.delete("/:id", protectRoute, isAdmin, deleteGame);

module.exports = router;
