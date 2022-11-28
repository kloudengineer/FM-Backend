const app = require("./server");

const dbConn = require("./configs/dbConn");
dbConn.connect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});