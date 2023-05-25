const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const data = require("./data.json");

const tx2 = require("tx2");

const meter = tx2.meter({
  name: "Requests per second",
  samples: 1,
  timeframe: 60,
});

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let totalRequestCounter = 0;

const totalReqs = tx2.metric({
  name: "Total Requests",
  value: () => totalRequestCounter,
});

app.get("/", (_, res) => {
  meter.mark();
  totalRequestCounter++;
  totalReqs.set(totalRequestCounter);
  res.json(data);
});

module.exports = app;
