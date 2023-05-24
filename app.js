const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const data = require("./data.json");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (_, res) => {
  res.json(data);
});

module.exports = app;
