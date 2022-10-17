const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const cron = require("node-cron");
const axios = require("axios");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const dbConn = require("./configs/dbConn");
const { verifyToken } = require("./middleware/auth");

const app = express();

app.use(cors());
// app.use(verifyToken);
app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
dbConn.connect();

//? call notification api.
//*/1 * * * * run every minute one time.

//*0 */12 * * * run this api every 12 hour one time.
// cron.schedule("*/1 * * * *", async () => {
//   try {
//     const notifications = await axios.get(
//       "http://localhost:5000/api/v1/staff-notification-list"
//     );
//     return notifications;
//   } catch (err) {
//     console.log(err.message);
//     return err.message;
//   }
// });

readdirSync("./routes").map((r) =>
  app.use("/api/v1", require("./routes/" + r))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
