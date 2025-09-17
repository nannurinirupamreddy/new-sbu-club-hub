const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const gameRouter = require("./routes/games.route");
const cors = require("cors");
const connectDB = require("./utils/db");
const defaultRoute = require("./routes/default.route");

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["https://new-sbu-club-hub.onrender.com",
            "https://visionary-florentine-9f61bc.netlify.app",
            "http://localhost:5173"],
    credentials: true,
  })
);

app.use("/", defaultRoute);
app.use("/api/auth/", authRoute);
app.use("/api/games/", gameRouter);

connectDB();

app.listen(PORT, () => {
  console.log("LISTENING ON PORT", `${PORT}`);
});
