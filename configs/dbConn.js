const mongoose = require("mongoose");
const dbUri = "mongodb+srv://dbuser:Bv86fljCt0pY0fd7@cluster0.4qxmn3t.mongodb.net/fmdb?retryWrites=true&w=majority"

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