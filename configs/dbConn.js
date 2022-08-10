const mongoose = require("mongoose");
const dbUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`

mongoose.Promise = global.Promise;

const connect = async () => {

  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  db.on("error", () => {
    console.error("Could not connect to database!");
  });

  db.once("open", () => {
    console.log("Successfully connected to database!");
  });

};

module.exports = { connect };