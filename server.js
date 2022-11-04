const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { readdirSync } = require("fs");
const morgan = require('morgan')

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const dbConn = require("./configs/dbConn");
const { verifyToken } = require('./middleware/auth')

const app = express();

app.use(cors());
app.use(verifyToken)
app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan('dev'))
dbConn.connect();

readdirSync("./routes").map((r) => app.use("/api/v1", require("./routes/" + r)));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })

