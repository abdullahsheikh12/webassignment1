const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let idCounter = 1;

// POST endpoint to add task
app.post('/addTask', (req, res) => {
    const { taskName } = req.body;
    if (!taskName) {
        return res.status(400).send('Task name is required');
    }
    const newTask = { id: idCounter++, taskName };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// GET endpoint to retrieve all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// DELETE endpoint to remove a task
app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).send('Task not found');
  }
  
  tasks.splice(taskIndex, 1);
  res.send(`Task ${taskId} deleted`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});