const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

server.post("/projects/", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const { tasks } = req.body;
  projects.push();
  // PAREI AQUI

  return res.json(projects);
});

server.listen(3000);
