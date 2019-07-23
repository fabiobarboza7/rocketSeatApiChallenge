const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  { id: "0", title: "projeto A" },
  { id: "1", title: "projeto A" }
];

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;
  const newProject = { id, title, tasks: [] };
  projects.push(newProject);

  return res.json(projects);
});

server.listen(3000);
