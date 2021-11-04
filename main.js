require("dotenv").config();
const express = require("express");

const app = express();

const { connection } = require("./Utils/Database/connection");
connection.on("error", (err) => console.log(err));
connection.once("open", () => console.log("Connected to the DB"));

const cors = require("cors");
app.use(cors());

app.use(express.raw());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./Routes");
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
