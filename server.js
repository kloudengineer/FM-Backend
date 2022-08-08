const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require("passport");
const { readdirSync } = require("fs");

const dbConn = require("./configs/dbConn");
const passportSetup = require("./configs/passportSetup")

dotenv.config({ path: "./configs/config.env" });
passportSetup(passport);

const app = express();

app.use(cors());
app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
dbConn.connect();

readdirSync("./routes").map((r) => app.use("/api/v1", require("./routes/" + r)));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })

