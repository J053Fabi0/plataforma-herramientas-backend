const express = require("express");

const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.raw());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./Routes");
app.use(routes);

module.exports = app;
