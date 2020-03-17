const express = require("express");
const db = require("../data/dbConfig")
const accRouter = require("../accounts/accRouter")
const server = express();

server.use(express.json());
server.use("/api/accounts", accRouter);

server.get("/", (req, res) => {
    res.send(200).json({ api: "running" });
  });

module.exports = server;
