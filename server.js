const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const morgan = require("morgan");

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const { verifyToken } = require("./middleware/auth");

const app = express();

morgan("tiny");
app.use(cors());
app.use(verifyToken);
app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

readdirSync("./routes").map((r) =>
    app.use("/api/v1", require("./routes/" + r))
);

module.exports = app;