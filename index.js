const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Sample tasks data (in-memory storage)
let tasks = [
    { id: '1', text: 'Complete project proposal' },
    { id: '2', text: 'Buy groceries' },
    { id: '3', text: 'Call dentist for appointment' }
];

// Routes
// Home page - display all tasks
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

// Add a new task
app.post('/add', (req, res) => {
    const { task } = req.body;
    if (task.trim() !== '') {
        const newTask = {
            id: uuidv4(),
            text: task
        };
        tasks.push(newTask);
    }
    res.redirect('/');
});

// Delete a task
app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== id);
    res.redirect('/');
});

// Edit a task
app.post('/edit', (req, res) => {
    const { id, task } = req.body;
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex !== -1 && task.trim() !== '') {
        tasks[taskIndex].text = task;
    }
    
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});