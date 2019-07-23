const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  { id: "0", title: "projeto A", tasks: [] },
  { id: "1", title: "projeto A", tasks: [] }
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

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === id);
  project.tasks.push(title);

  return res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);
  projects.splice(projectIndex, 1);
  return res.json(projects);
});

server.listen(3000);
