const express = require("express");

const server = express();
server.use(express.json());

const projects = [];
let reqs = 0;

function logReqs(req, res, next) {
  reqs++;
  console.log(`Numbers of Requests ${reqs}`);
  return next();
}

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(400).json({ error: "Project not found :/" });
  }

  return next();
}

server.use(logReqs);

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

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === id);
  project.tasks.push(title);

  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);
  projects.splice(projectIndex, 1);
  return res.json(projects);
});

server.listen(3000);
