require("dotenv").config();

const { connection } = require("./Utils/Database/connection");
connection.on("error", (err) => console.log(err));
connection.once("open", () => console.log("Connected to the DB"));

const app = require("./app");

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
