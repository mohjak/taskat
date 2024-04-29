require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors());

const mongoUri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected successfully to MongoDB");
});

// Define a schema for Task
const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
    dueDate: Date
});

// Create a model for Task
const Task = mongoose.model('Task', taskSchema);

// Endpoint to create a new task
app.post('/tasks', (req, res) => {
    const newTask = new Task(req.body);
    newTask.save()
        .then(task => res.status(201).send(task))
        .catch(err => res.status(400).send(err));
});

// In your Express server (e.g., server.js)
app.get('/tasks', (req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

// In your Express server (e.g., server.js)
app.delete('/tasks/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('Task deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update a task
app.patch('/tasks/:id', (req, res) => {
    const updates = req.body;
    const options = { new: true }; // Returns the modified document.

    Task.findByIdAndUpdate(req.params.id, updates, options)
        .then(task => {
            if (!task) {
                return res.status(404).send();
            }
            res.send(task);
        })
        .catch(err => res.status(400).send(err));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
